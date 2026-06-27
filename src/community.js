// Community screen: message board (留言板) + update board (更新板), two tabs.
// Network lives in community-api.js; this module is rendering + interaction only.
// All user/admin text is escaped before insertion. Degrades gracefully when the
// backend is not configured (offline file:// builds).
import { escapeHtml } from './utils.js';
import { showToast } from './notify.js';
import { icon } from './icons.js';
import { APP_VERSION } from './constants.js';
import {
  shareApiConfigured, submitMessage, listMessages, listRoadmap, voteRoadmap,
} from './community-api.js';

const ANON = "匿名豆友";
const STATUS_LABEL = { planned: "计划中", in_progress: "开发中", shipped: "已发布" };

let messagesEl = null;
let roadmapEl = null;
let loadedMessages = false;
let loadedRoadmap = false;

function relativeTime(iso) {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const diff = Date.now() - then;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "刚刚";
  if (min < 60) return `${min} 分钟前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} 小时前`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} 天前`;
  return new Date(then).toLocaleDateString("zh-CN");
}

function notConfiguredHtml(text) {
  return `<div class="community-empty"><p class="community-empty-text">${escapeHtml(text)}</p></div>`;
}

// ── Message board ────────────────────────────────────────────────────────────

function messageItemHtml(m) {
  const name = m.nickname ? escapeHtml(m.nickname) : ANON;
  return `<li class="community-message">
    <div class="community-message-head">
      <strong class="community-message-name">${name}</strong>
      <span class="community-message-time">${escapeHtml(relativeTime(m.createdAt))}</span>
    </div>
    <p class="community-message-body">${escapeHtml(m.content)}</p>
  </li>`;
}

function renderMessagesShell() {
  messagesEl.innerHTML = `
    <form class="community-compose" id="communityCompose" novalidate>
      <input class="community-nickname" id="communityNickname" type="text" maxlength="16"
        placeholder="昵称" aria-label="昵称" />
      <textarea class="community-textarea" id="communityContent" maxlength="200" rows="3"
        placeholder="留个言吧～想看什么图纸、哪里不好用都可以说" aria-label="留言内容"></textarea>
      <div class="community-compose-foot">
        <span class="community-count" id="communityCount">0/200</span>
        <button class="primary-button" id="communitySendButton" type="submit">发送留言</button>
      </div>
    </form>
    <ul class="community-message-list" id="communityMessageList"></ul>
    <div class="community-list-state" id="communityMessagesState"></div>`;

  const content = messagesEl.querySelector("#communityContent");
  const count = messagesEl.querySelector("#communityCount");
  content.addEventListener("input", () => { count.textContent = `${content.value.length}/200`; });
  messagesEl.querySelector("#communityCompose").addEventListener("submit", onSubmitMessage);
}

async function onSubmitMessage(event) {
  event.preventDefault();
  const nickname = messagesEl.querySelector("#communityNickname").value.trim();
  const content = messagesEl.querySelector("#communityContent").value.trim();
  const button = messagesEl.querySelector("#communitySendButton");
  if (!content) { showToast("留言不能是空的哦。"); return; }
  button.disabled = true;
  button.textContent = "发送中";
  try {
    await submitMessage({ nickname, content });
    messagesEl.querySelector("#communityContent").value = "";
    messagesEl.querySelector("#communityNickname").value = "";
    messagesEl.querySelector("#communityCount").textContent = "0/200";
    showToast("留言已提交，审核通过后就会出现～");
  } catch (err) {
    showToast(err?.message || "发送失败，稍后再试。");
  } finally {
    button.disabled = false;
    button.textContent = "发送留言";
  }
}

async function loadMessages() {
  const list = messagesEl.querySelector("#communityMessageList");
  const stateEl = messagesEl.querySelector("#communityMessagesState");
  stateEl.textContent = "加载中…";
  try {
    const data = await listMessages({ limit: 20 });
    const items = data?.items || [];
    list.innerHTML = items.map(messageItemHtml).join("");
    stateEl.textContent = items.length ? "" : "还没有留言，来当第一个吧～";
  } catch (err) {
    stateEl.textContent = err?.message || "加载失败，下拉刷新试试。";
  }
}

// ── Update board ─────────────────────────────────────────────────────────────

function roadmapItemHtml(item) {
  const status = STATUS_LABEL[item.status] || STATUS_LABEL.planned;
  const ver = item.status === "shipped" && item.version ? ` v${escapeHtml(item.version)}` : "";
  const likeIcon = icon("heart", { size: 16 });
  return `<li class="community-road-item" data-road-id="${escapeHtml(item.id)}">
    <div class="community-road-main">
      <div class="community-road-head">
        <span class="community-road-pill community-road-pill-${escapeHtml(item.status)}">${status}${ver}</span>
        <strong class="community-road-title">${escapeHtml(item.title)}</strong>
      </div>
      ${item.desc ? `<p class="community-road-desc">${escapeHtml(item.desc)}</p>` : ""}
    </div>
    <button class="community-like ${item.voted ? "is-voted" : ""}" type="button"
      data-road-vote="${escapeHtml(item.id)}" aria-pressed="${item.voted ? "true" : "false"}"
      aria-label="点赞这条更新">${likeIcon}<span class="community-like-count">${Number(item.votes) || 0}</span></button>
  </li>`;
}

async function loadRoadmap() {
  roadmapEl.innerHTML = `
    <p class="community-road-version">当前版本 v${escapeHtml(APP_VERSION)}</p>
    <ul class="community-road-list" id="communityRoadList"></ul>
    <div class="community-list-state" id="communityRoadState">加载中…</div>`;
  const list = roadmapEl.querySelector("#communityRoadList");
  const stateEl = roadmapEl.querySelector("#communityRoadState");
  try {
    const data = await listRoadmap();
    const items = data?.items || [];
    list.innerHTML = items.map(roadmapItemHtml).join("");
    stateEl.textContent = items.length ? "" : "更新计划马上就来～";
    list.querySelectorAll("[data-road-vote]").forEach((btn) => {
      btn.addEventListener("click", () => onVote(btn));
    });
  } catch (err) {
    stateEl.textContent = err?.message || "加载失败，稍后再试。";
  }
}

async function onVote(button) {
  const id = button.dataset.roadVote;
  const countEl = button.querySelector(".community-like-count");
  const wasVoted = button.classList.contains("is-voted");
  // Optimistic toggle
  button.classList.toggle("is-voted", !wasVoted);
  button.setAttribute("aria-pressed", String(!wasVoted));
  countEl.textContent = String((Number(countEl.textContent) || 0) + (wasVoted ? -1 : 1));
  button.disabled = true;
  try {
    const res = await voteRoadmap(id);
    button.classList.toggle("is-voted", Boolean(res?.voted));
    button.setAttribute("aria-pressed", String(Boolean(res?.voted)));
    if (typeof res?.votes === "number") countEl.textContent = String(res.votes);
  } catch (err) {
    // rollback
    button.classList.toggle("is-voted", wasVoted);
    button.setAttribute("aria-pressed", String(wasVoted));
    countEl.textContent = String((Number(countEl.textContent) || 0) + (wasVoted ? 1 : -1));
    showToast(err?.message || "操作失败，稍后再试。");
  } finally {
    button.disabled = false;
  }
}

// ── Tabs + entry ─────────────────────────────────────────────────────────────

export function initCommunity(els) {
  messagesEl = els.communityMessages;
  roadmapEl = els.communityRoadmap;
  if (!messagesEl || !roadmapEl) return;

  const tabMsg = els.communityTabMessages;
  const tabRoad = els.communityTabRoadmap;
  const select = (which) => {
    const isMsg = which === "messages";
    tabMsg.setAttribute("aria-selected", String(isMsg));
    tabRoad.setAttribute("aria-selected", String(!isMsg));
    messagesEl.hidden = !isMsg;
    roadmapEl.hidden = isMsg;
    if (!isMsg && !loadedRoadmap) { loadedRoadmap = true; loadRoadmap(); }
    if (isMsg && !loadedMessages) { loadedMessages = true; loadMessages(); }
  };
  tabMsg?.addEventListener("click", () => select("messages"));
  tabRoad?.addEventListener("click", () => select("roadmap"));

  els.communityRefreshButton?.addEventListener("click", () => {
    if (roadmapEl.hidden) loadMessages(); else loadRoadmap();
  });
}

// Called by setAppMode when entering the community screen.
export function enterCommunity() {
  if (!messagesEl) return;
  if (!shareApiConfigured()) {
    messagesEl.innerHTML = notConfiguredHtml("留言服务还没配置，稍后再来看看～");
    roadmapEl.innerHTML = notConfiguredHtml("更新板还没配置。");
    return;
  }
  if (!messagesEl.querySelector("#communityCompose")) renderMessagesShell();
  if (!loadedMessages) { loadedMessages = true; loadMessages(); }
}
