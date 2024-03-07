interface IomdbMovies {
  Id?: string,
  Title: string,
  Year: string,
  Plot: string,
  Poster: string
}

export const moviesData: IomdbMovies[] = [
  { 
    Id: '1',
    Title: "The Avengers",
    Plot: "Um clássico filme de máfia dirigido por Francis Ford Coppola.",
    Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX2048.jpg",
    Year: '2012'
  },
  { 
    Id: '2',
    Title: "Wolverine Vs. Deadpool: Back to Weapon X",
    Plot: "Wolverine is chasing down Deadpool to take him back to Weapon X Project, but Wade has other ideas..",
    Poster: "https://m.media-amazon.com/images/M/MV5BNWVhOWU1NTMtNDY5My00NjQyLWI3ZTEtYTMzNTNkYzdkMDMyXkEyXkFqcGdeQXVyNjQyNjgwNjU@._V1_SX2048.jpg",
    Year: '2022'
  },
  { 
    Id: 'tt1877830',
    Title: "The Batman",
    Plot: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX2048.jpg",
    Year: '2022'
  },
  { 
    Id: 'tt0145487',
    Title: "Spider-Man",
    Plot: "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.",
    Poster: "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX2048.jpg",
    Year: '2002'
  },
  { 
    Id: 'tt2382320',
    Title: "No Time to Die",
    Plot: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
    Poster: "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX2048.jpg",
    Year: '2017'
  },
  { 
    Id: 'tt9032400',
    Title: "Eternals",
    Plot: "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTExZmVjY2ItYTAzYi00MDdlLWFlOWItNTJhMDRjMzQ5ZGY0XkEyXkFqcGdeQXVyODIyOTEyMzY@._V1_SX2048.jpg",
    Year: '2022'
  },
  { 
    Id: 'tt9376612',
    Title: "Shang-Chi and the Legend of the Ten Rings",
    Plot: "Shang-Chi, the master of weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
    Poster: "https://m.media-amazon.com/images/M/MV5BNTliYjlkNDQtMjFlNS00NjgzLWFmMWEtYmM2Mzc2Zjg3ZjEyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX2048.jpg",
    Year: '2021'
  },
  { 
    Id: 'tt0870154',
    Title: "Jungle Cruise",
    Plot: "Based on Disneyland's theme park ride where a small riverboat takes a group of travelers through a jungle filled with dangerous animals and reptiles but with a supernatural element.",
    Poster: "https://m.media-amazon.com/images/M/MV5BNDE1MGRlNTQtZjc4ZC00MTI0LWEwY2MtODk1YTM2NmFmYTNmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX2048.jpg",
    Year: '2021'
  },
  { 
    Id: 'tt6264654',
    Title: "Free Guy",
    Plot: "When Guy, a bank teller, learns that he is a non-player character in a bloodthirsty, open-world video game, he goes on to become the hero of the story and takes the responsibility of saving the world.",
    Poster: "https://m.media-amazon.com/images/M/MV5BOTY2NzFjODctOWUzMC00MGZhLTlhNjMtM2Y2ODBiNGY1ZWRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX2048.jpg",
    Year: '2021'
  },
  { 
    Id: 'tt1270797',
    Title: "Venom",
    Plot: "A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it",
    Poster: "https://m.media-amazon.com/images/M/MV5BNTFkZjdjN2QtOGE5MS00ZTgzLTgxZjAtYzkyZWQ5MjEzYmZjXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_SX2048.jpg",
    Year: '2018'
  },
  { 
    Id: 'tt0087332',
    Title: "Ghostbusters",
    Plot: "Three parapsychologists forced out of their university funding set up shop as a unique ghost removal service in New York City, attracting frightened yet skeptical customers.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTkxMjYyNzgwMl5BMl5BanBnXkFtZTgwMTE3MjYyMTE@._V1_SX2048.jpg",
    Year: '2018'
  },
  { 
    Id: 'tt1877830',
    Title: "The Batman",
    Plot: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX2048.jpg",
    Year: '2022'
  },
  { 
    Id: 'tt0145487',
    Title: "Spider-Man",
    Plot: "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.",
    Poster: "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX2048.jpg",
    Year: '2002'
  },
  { 
    Id: 'tt2382320',
    Title: "No Time to Die",
    Plot: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
    Poster: "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX2048.jpg",
    Year: '2017'
  },
  { 
    Id: 'tt9032400',
    Title: "Eternals",
    Plot: "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTExZmVjY2ItYTAzYi00MDdlLWFlOWItNTJhMDRjMzQ5ZGY0XkEyXkFqcGdeQXVyODIyOTEyMzY@._V1_SX2048.jpg",
    Year: '2022'
  },
  { 
    Id: 'tt9376612',
    Title: "Shang-Chi and the Legend of the Ten Rings",
    Plot: "Shang-Chi, the master of weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
    Poster: "https://m.media-amazon.com/images/M/MV5BNTliYjlkNDQtMjFlNS00NjgzLWFmMWEtYmM2Mzc2Zjg3ZjEyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX2048.jpg",
    Year: '2021'
  },
    // Adicione mais filmes conforme necessário
]