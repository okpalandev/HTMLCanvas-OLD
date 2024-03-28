# Implementing Game Logic:

In this chapter,we will at implement the game logic using a state machine.

## What is a State Machine?
A State Machine is an abstract machine that transition between state  till it enter a dead state/final state when their are no more transistions.

We will impmentate a function to transition between state,because our game our module is growing
so that we will not waste time adding new state to a configuration  our self.

```js
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

````