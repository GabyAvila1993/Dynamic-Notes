import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() note: Partial<Note>) {
    return this.notesService.create(note);
  }

  @Get('active')
  findActive() {
    return this.notesService.findAllActive();
  }

  @Get('archived')
  findArchived() {
    return this.notesService.findAllArchived();
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.notesService.findByCategory(category);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() note: Partial<Note>) {
    return this.notesService.update(id, note);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.notesService.delete(id);
  }

  @Put(':id/archive')
  toggleArchive(@Param('id') id: number) {
    return this.notesService.toggleArchive(id);
  }
}
