export function workflowSummary(phases, phaseId) {
  const index = Math.max(0, phases.findIndex((phase) => phase.id === phaseId));
  return {
    index,
    total: phases.length,
    current: phases[index]?.name || "",
    next: phases[index + 1]?.name || "",
  };
}
