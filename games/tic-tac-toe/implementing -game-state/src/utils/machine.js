function createMachine(config) {
  return {
    state: config.initial,
    transition(action) {
      const nextState = config.states[this.state].transitions[action];
      if (!nextState) {
        throw new Error(`Invalid action: ${action}`);
      }
      this.state = nextState;
    },
  };
}

export {createMachine}
