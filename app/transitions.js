export default function(){
  this.transition(
    this.childOf('#assignment-creator-step'),
    this.use('fade', {duration: 500}),
  );
}
