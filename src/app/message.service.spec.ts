import { MessageService } from "./message.service";

describe('Message Service', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should be no messsages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add a messag when add is called', () => {
    service.add('message1');

    expect(service.messages.length).toBe(1);
  });

  it('should add a messag when clear is called', () => {
    service.add('message1');
    service.clear();

    expect(service.messages.length).toBe(0);
  });

});
