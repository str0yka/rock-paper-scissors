interface Message<Event extends string, Data> {
  event: Event;
  data: Data;
}
