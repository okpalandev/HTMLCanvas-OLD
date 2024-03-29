/**
 * Creates a state machine object based on the provided configuration.
 *
 * @param {Object} config - The configuration object for the state machine.
 * @param {string} config.initial - The initial state of the state machine.
 * @param {Object} config.states - The states and transitions of the state machine.
 * @returns {Object} - The state machine object.
 */
function createMachine(config) {
  const noop = () => {};
  return {
    state: config.initial,
    transition(action) {
      const currentState = config.states[this.state];
      const nextState = currentState.transitions[action];
      if (!nextState) {
       console.warn (`Invalid Action:${action} for State:${this.state}`);
       console.warn(`Stubbing with no-op transition`);
        return noop; // no-op transition
      }
      this.state = nextState;

      // Check if an onEnter function is defined for the next state
      const onEnter = currentState.onEnter;
      if (onEnter && typeof onEnter === 'function') {
        onEnter.call(this); // Call the onEnter function with the context of the state machine
      }
    },
    dispatch(action) {
      this.transition(action);
      this.emit('transition', this.state);
    },
    on(event, callback) {
      this[event] = callback;
    },
    emit(event, data) {
      if (this[event]) {
        this[event](data);
      }
    }

  };
}

export {createMachine}
