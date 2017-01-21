import { stop, animate, Promise } from "liquid-fire";

export default function fadeOff(opts={}) {
  var direction = 1;
  if (opts.direction === 'cw') {
    direction = -1;
  }
  stop(this.oldElement);
  return Promise.all([
    animate(this.oldElement, {scale: [0.2, 1]}, opts),
    animate(this.newElement, {scale: [1, 0.2]}, opts),
  ]);
}
