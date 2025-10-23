class GameNotifier {
  constructor() {
    this.handlers = [];
    setInterval(() => {
      const score = Math.floor(Math.random() * 3000);
      const date = new Date().toLocaleDateString();
      const userName = 'Eich';
      this.broadcastEvent(userName, 'End', { name: userName, score, date });
    }, 5000);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  broadcastEvent(from, type, value) {
    const event = { from, type, value };
    this.handlers.forEach(h => h(event));
  }
}

export const gameNotifier = new GameNotifier();
