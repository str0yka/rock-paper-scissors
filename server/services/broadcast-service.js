class BroadcastService {
  constructor(wss) {
    this.wss = wss;
  }

  send(event, data, validate = () => true) {
    const message = {
      event,
      data,
    };

    this.wss.clients.forEach((client) => {
      if (validate(client)) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

export default BroadcastService;
