/**
 * Creates a state machine object based on the provided configuration.
 *
 * @param {Object} config - The configuration object for the state machine.
 * @param {string} config.initial - The initial state of the state machine.
 * @param {Object} config.states - The states and transitions of the state machine.
 * @returns {Object} - The state machine object.
 */
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
