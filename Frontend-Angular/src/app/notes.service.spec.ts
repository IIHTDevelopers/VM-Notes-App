import { NotesService } from './notes.service';
import { of } from 'rxjs';

describe('NotesService', () => {
  const url = 'http://127.0.0.1:8080/noteapp/noteservice';
  let service: NotesService;
  let httpClientSpy: any;
  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
    service = new NotesService(httpClientSpy);
  });

  describe("boundary", ()=>{

    it('notes service should be created', () => {
      expect(service).toBeTruthy();
    });
  
  
  })


describe("business", ()=>{

  it('testing getNotes', () => {
    const res = 'Venu';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getNotes();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url + '/all');
  });

  it('testing postNotes', () => {
    const data = {
      title: 't',
      author: 'a',
      description: 'd',
      status: 's',
    };
    const res = 'venu';

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
    service.postNotes(data);
    expect(httpClientSpy.post).toBeCalledTimes(1);
  });
});
});
