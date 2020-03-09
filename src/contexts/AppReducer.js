export default (state, action) => {
  switch (action.type) {
    case 'update': {
      return { conversations: [...action.conversations], ready: true };
    }

    case 'refresh': {
      return { ...state, refresh: !state.refresh };
    }

    case 'update-single': {
      const newArray = state.conversations.filter(
        obj => action.conversation._id !== obj._id
      );
      return {
        ...state,
        conversations: [action.conversation, ...newArray],
        refresh: !state.refresh
      };
    }

    case 'add': {
      return { conversations: [action.conversation, ...state.conversations] };
    }
    default:
      return state;
  }
};