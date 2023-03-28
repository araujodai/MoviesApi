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

};

module.exports = MovieNotesController;