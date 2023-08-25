import axios from 'axios';
import { NotesFilters } from '../../../../store/todo/Notes/notesSlice';
import { AssignPeopleSelectValueModel } from '../../../models/assignPeopleSelectValue.model';
import { NoteItemModel } from '../../../models/todo/notes/noteItemModel';
import { NoteFormPayloadModel } from '../../../models/todo/notes/noteFormPayloadModel.model';
import { TodoItemModel } from '../../../models/todo/todoItemModel';

const todoNotesEndpoints = {
  createNote: (params: NoteFormPayloadModel): Promise<NoteItemModel> => axios.post('/note-items', params),
  getNotesItems: (params: NotesFilters & { page?: number; is_need_action?: number }): Promise<any> =>
    axios.get('/note-items', { params }),
  sortNotes: (id: number, data: { position: number }) => axios.put(`/note-items/${id}/position`, data),
  getNote: (todoId: number): Promise<TodoItemModel> => axios.get(`/note-items/${todoId}`),

  deleteNote: (params: { noteId: number }): Promise<number> =>
    axios.delete(`/note-items/${params.noteId}`, { params }),
  removeYourself: (params: { noteId: number }): Promise<number> =>
    axios.delete(`/note-items/${params.noteId}/self`, { params }),
  updateUsersNote: (params: {
    users: AssignPeopleSelectValueModel[];
    noteId: number;
  }): Promise<NoteItemModel> => axios.put(`/note-items/${params.noteId}/users`, params),
  updateChecklistItem: (params: { noteId: number; item: NoteItemModel }): Promise<NoteItemModel> =>
    axios.put(`/note-items/${params.noteId}`, { ...params.item }),
  changeIsOpen: (params: { noteId: number; is_open: number }): Promise<undefined> =>
    axios.put(`/note-items/${params.noteId}/is-open`, { ...params }),
};

export default todoNotesEndpoints;
