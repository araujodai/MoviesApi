const knex = require("../database/knex");

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const note_id = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      const movieNoteId = note_id[0];
      return {
        name,
        note_id: movieNoteId,
        user_id
      }
    });

    await knex("movieTags").insert(tagsInsert);

    response.json();
  };

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("movieNotes").where({ id }).first();
    const tags = await knex("movieTags").where({ note_id: id }).orderBy("name");

    return response.json({
      ...note,
      tags
    });
  };

  async delete(request, response) {
    const { id } = request.params;

    await knex("movieNotes").where({ id }).delete();

    return response.json();
  };

  async index(request, response) {
    const { user_id } = request.query;

    const notes = await knex("movieNotes")
      .where({ user_id })
      .orderBy("title");

    return response.json(notes);
  };

};

module.exports = MovieNotesController;