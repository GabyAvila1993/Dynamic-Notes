import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepo: Repository<Note>,
  ) {}

  create(note: Partial<Note>) {
    return this.notesRepo.save(note);
  }

  findAllActive() {
    return this.notesRepo.find({ where: { archived: false } });
  }

  findAllArchived() {
    return this.notesRepo.find({ where: { archived: true } });
  }

  findByCategory(category: string) {
    return this.notesRepo.find({ where: { category, archived: false } });
  }

  update(id: number, note: Partial<Note>) {
    return this.notesRepo.update(id, note);
  }

  delete(id: number) {
    return this.notesRepo.delete(id);
  }

  async toggleArchive(id: number) {
    const note = await this.notesRepo.findOneBy({ id });
    if (!note) return null;
    note.archived = !note.archived;
    return this.notesRepo.save(note);
  }
}
