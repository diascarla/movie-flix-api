import express from "express";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/movies", async (_, res) => {
  const movies = await prisma.movie.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      genres: true,
      languages: true,
    },
  });
  res.json(movies);
});

app.post("/movies", async (req, res) => {
  const { title, genre_id, language_id, oscar_count, release_date } = req.body;

  const movieWithSameTitle = await prisma.movie.findFirst({
    where: { title: { equals: title, mode: "insensitive" } },
  });

  if (movieWithSameTitle) {
    return res
      .status(409)
      .send({ message: "Já existe um filme cadastrado com esse título" });
  }

  try {
    await prisma.movie.create({
      data: {
        title,
        genre_id,
        language_id,
        oscar_count,
        release_date: new Date(release_date),
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Falha ao cadastrar filme" });
  }
  res.status(201).send();
});

app.put("/movies/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const movies = await prisma.movie.findUnique({
      where: {
        id,
      },
    });

    if (!movies) {
      return res.status(404).send({ message: "Filme não encontrado" });
    }

    const data = { ...req.body };
    data.release_date = data.release_date
      ? new Date(req.body.release_date)
      : undefined;

    const movie = await prisma.movie.update({
      where: {
        id,
      },
      data: data,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Falha ao atualizar o registro do filme" });
  }
  res.status(200).send();
});

app.delete("/movies/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const movie = await prisma.movie.findUnique({ where: { id } });

    if (!movie) {
      return res.status(404).send({ message: "O filme não foi encontrado" });
    }

    await prisma.movie.delete({
      where: { id },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Não foi possível remover o filme" });
  }
  res.status(200).send();
});

app.get("/movies/:genreName", async (req, res) => {
  console.log(req.params.genreName);

  try {
    const moviesFilteredByGenreName = await prisma.movie.findMany({
      include: {
        genres: true,
        languages: true,
      },
      where: {
        genres: {
          name: {
            equals: req.params.genreName,
            mode: "insensitive",
          },
        },
      },
    });
    res.status(200).send(moviesFilteredByGenreName);
  } catch (error) {
    res.status(500).send({ message: "Falha ao filtrar filmes por gênero" });
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});
