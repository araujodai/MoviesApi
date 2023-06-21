const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const user_id = request.user.id;

    const ratingLimit = rating > 0 && rating < 6

    if (!ratingLimit) {
      throw new AppError("Informe uma nota de 1 a 5.")
    }



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
    const { title, tags } = request.query;
    const user_id = request.user.id;

    let notes;

    if (tags) {
      const filterTags = tags
        .split(',')
        .map(tag => tag.trim());
        
      notes = await knex("movieTags")
        .select([
          "movieNotes.id",
          "movieNotes.title",
          "movieNotes.user_id",
        ])
        .where("movieNotes.user_id", user_id)
        .whereLike("movieNotes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movieNotes", "movieNotes.id", "movieTags.note_id")
        .orderBy("movieNotes.title");

    } else {
      notes = await knex("movieNotes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    };

    const userTags = await knex("movieTags").where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    });

    return response.json(notesWithTags);
  };

};

module.exports = MovieNotesController;