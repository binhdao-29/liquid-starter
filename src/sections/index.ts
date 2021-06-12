class Counter {
  private obj: HTMLElement;

  private start: number;

  private end: number;

  private duration: number;

  constructor(obj: HTMLElement, start: number, end: number, duration: number) {
    this.obj = obj;
    this.start = start;
    this.end = end;
    this.duration = duration;
  }

  animateValue() {
    if (this.obj) {
      const textStarting = this.obj.innerHTML;
      const range = this.end - this.start;
      const minTimer = 50;

      let stepTime = Math.abs(Math.floor(this.duration / range));

      stepTime = Math.max(stepTime, minTimer);

      const startTime = new Date().getTime();
      const endTime = startTime + this.duration;
      let timer: any;

      const run = () => {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / this.duration, 0);
        const value = Math.round(this.end - (remaining * range));
        this.obj.innerHTML = textStarting.replace(/([0-9]+)/g, `${value}`);
        if (value === this.end) {
          clearInterval(timer);
        }
      };
      timer = setInterval(run, stepTime);
      run();
    }
  }
}

const counter = document.getElementById('counter') as HTMLElement;

if (counter) {
  const observer = new IntersectionObserver(() => {
    const value1 = document.querySelector('#value1') as HTMLElement;
    const counter1 = new Counter(value1, 0, 500, 4000);
    counter1.animateValue();
    const value2 = document.querySelector('#value2') as HTMLElement;
    const counter2 = new Counter(value2, 0, 500, 4000);
    counter2.animateValue();
    const award = document.querySelector('#award') as HTMLElement;
    const counterAward = new Counter(award, 0, 12, 4000);
    counterAward.animateValue();
  }, { threshold: 0.5 });
  observer.observe(counter);
}
