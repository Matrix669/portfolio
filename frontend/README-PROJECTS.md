# Jak dodać nowy projekt

Dodanie projektu wymaga zmian w **4 miejscach**:

1. zdjęcia w `src/app/assets/MyWork/<nazwa-projektu>/`
2. wpis w [src/app/constants/myProjects.ts](src/app/constants/myProjects.ts)
3. teksty po polsku w [messages/pl.json](messages/pl.json)
4. teksty po angielsku w [messages/en.json](messages/en.json)

Wszystko łączy **`id` projektu**. To ten sam numer w `myProjects.ts` i w kluczach JSON-a (`projects.<id>`). Nowy projekt dostaje kolejny wolny numer (obecnie ostatni to `6`, więc następny to `7`).

---

## 1. Zdjęcia

Utwórz folder w `src/app/assets/MyWork/` (nazwa w kebab-case, np. `moj-nowy-projekt`) i wrzuć tam screenshoty jako `img1.png`, `img2.png`, `img3.png` itd.

```
src/app/assets/MyWork/moj-nowy-projekt/
├── img1.png   <- ZDJĘCIE GŁÓWNE (okładka)
├── img2.png
└── img3.png
```

**Kolejność zdjęć ma znaczenie:**

- **Pierwsze zdjęcie (`images[0]`) to zdjęcie projektu** widoczne na karcie projektu na stronie głównej (i na liście `/projekty`). Wybierz najlepszy screenshot, zwykle stronę główną projektu.
- Wszystkie zdjęcia, razem z pierwszym, trafiają do galerii (slider) po kliknięciu „Więcej".

---

## 2. `myProjects.ts`

Plik: [src/app/constants/myProjects.ts](src/app/constants/myProjects.ts)

### a) Zaimportuj zdjęcia (góra pliku)

Konwencja nazwy: `NAZWA_PROJEKTU_IMG1`, `NAZWA_PROJEKTU_IMG2`, ...

```ts
import MOJ_NOWY_PROJEKT_IMG1 from "@/app/assets/MyWork/moj-nowy-projekt/img1.png";
import MOJ_NOWY_PROJEKT_IMG2 from "@/app/assets/MyWork/moj-nowy-projekt/img2.png";
import MOJ_NOWY_PROJEKT_IMG3 from "@/app/assets/MyWork/moj-nowy-projekt/img3.png";
```

### b) Dodaj nowe technologie (jeśli trzeba)

Lista technologii to typ `technologiesIT`. Jeśli używasz technologii, której tam nie ma, dopisz ją do odpowiedniej sekcji (FRONTEND / STYLES / BACKEND / JS libraries / OTHER). W przeciwnym razie TypeScript zgłosi błąd.

```ts
type technologiesIT =
  | "Next.js"
  // ...
  | "nazwa-nowej-technologii";
```

### c) Dodaj obiekt do tablicy `MY_PROJECTS`

**Nowy projekt dodaj na początku tablicy.** Kolejność w tablicy to kolejność wyświetlania (najnowsze na górze), a strona główna pokazuje tylko pierwsze N projektów (`limitProjects`).

```ts
const MY_PROJECTS: MyProjectsBaseProps[] = [
  {
    id: 7,
    images: [
      {
        imageSrc: MOJ_NOWY_PROJEKT_IMG1.src,
        width: MOJ_NOWY_PROJEKT_IMG1.width,
        height: MOJ_NOWY_PROJEKT_IMG1.height,
      },
      {
        imageSrc: MOJ_NOWY_PROJEKT_IMG2.src,
        width: MOJ_NOWY_PROJEKT_IMG2.width,
        height: MOJ_NOWY_PROJEKT_IMG2.height,
      },
      {
        imageSrc: MOJ_NOWY_PROJEKT_IMG3.src,
        width: MOJ_NOWY_PROJEKT_IMG3.width,
        height: MOJ_NOWY_PROJEKT_IMG3.height,
      },
    ],
    linkHref: "https://adres-projektu.pl/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "git"],
  },
  // ...pozostałe projekty
];
```

Pola:

| Pole           | Opis                                                                         |
| -------------- | ---------------------------------------------------------------------------- |
| `id`           | Unikalny numer. Musi być taki sam jak klucz w `pl.json` / `en.json`.         |
| `images`       | Tablica zdjęć. **Pierwsze = okładka**. `width`/`height` bierz z importu.     |
| `linkHref`     | Link do live wersji projektu (tekst przycisku jest w plikach `messages`).    |
| `technologies` | Lista z typu `technologiesIT`, wyświetlana jako tagi.                        |

> Teksty (tytuł, opisy, alty) **nie** trafiają do `myProjects.ts`. Są pobierane z plików `messages` po `id` (funkcja `getMyProjects`).

---

## 3. Teksty: `pl.json` i `en.json`

Pliki: [messages/pl.json](messages/pl.json) i [messages/en.json](messages/en.json)

Ścieżka w obu plikach: `mainPage` -> `workSection` -> `projects` -> `"<id>"`.

**Dodaj ten sam blok do OBU plików** (po polsku i po angielsku), z tym samym `id` i tą samą liczbą wpisów w `images`:

```json
"7": {
  "title": "Tytuł projektu",
  "mainDescription": "Krótki opis widoczny na karcie projektu (1-3 zdania).",
  "description": "Dłuższy opis widoczny po kliknięciu „Więcej".\n\n Nowy akapit oddzielaj przez \\n\\n.",
  "link": {
    "label": "Odwiedź stronę"
  },
  "images": {
    "0": {
      "imageAlt": "Opis zdjęcia głównego (okładki)."
    },
    "1": {
      "imageAlt": "Opis drugiego zdjęcia."
    },
    "2": {
      "imageAlt": "Opis trzeciego zdjęcia."
    }
  }
}
```

Pola:

| Klucz             | Opis                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| `title`           | Nazwa projektu.                                                                       |
| `mainDescription` | Krótki opis na karcie projektu.                                                       |
| `description`     | Pełny opis w oknie dialogowym. Akapity oddzielaj `\n\n`.                              |
| `link.label`      | Tekst przycisku z linkiem (np. „Odwiedź stronę" / „Visit the website").               |
| `images.<n>.imageAlt` | Tekst alternatywny (dostępność + SEO). Indeks `n` odpowiada kolejności w `images` w `myProjects.ts`, liczonej od `0`. |

Wersja angielska ma dokładnie taką samą strukturę, zmienia się tylko treść (np. `"label": "Visit the website"`).

---

## Checklista

- [ ] Zdjęcia w `src/app/assets/MyWork/<nazwa>/img1.png ...`, a **`img1` to okładka**
- [ ] Importy zdjęć na górze `myProjects.ts`
- [ ] (opcjonalnie) nowe technologie dopisane do `technologiesIT`
- [ ] Nowy obiekt z `id` na **początku** tablicy `MY_PROJECTS`
- [ ] Blok `projects.<id>` w `pl.json`
- [ ] Blok `projects.<id>` w `en.json`
- [ ] Liczba wpisów `images` w JSON-ach == liczba zdjęć w `myProjects.ts` (każde zdjęcie ma swój `imageAlt`)
- [ ] Sprawdzone lokalnie (`pnpm dev`): karta na stronie głównej, `/projekty`, okno „Więcej", obie wersje językowe

## Częste błędy

- **Brak wpisu w jednym z plików `messages`**: zamiast tekstu pojawi się klucz tłumaczenia albo błąd. Zawsze dodawaj do PL i EN.
- **Inne `id` w kodzie i w JSON-ie**: teksty się nie załadują.
- **Brakujący `imageAlt` dla któregoś zdjęcia**: każde zdjęcie z `images` potrzebuje wpisu pod swoim indeksem.
- **Zła kolejność zdjęć**: okładką zawsze jest pierwszy element `images`.
