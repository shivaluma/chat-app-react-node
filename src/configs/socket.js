import io from 'socket.io-client';
import url from './url';

const socket = io(url.LOCAL);

socket.on('disconnect', () => {
  socket.emit('user-setOffline', localStorage.userId);
});

export default socket;
