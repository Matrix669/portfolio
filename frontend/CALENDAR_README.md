# Kalendarz Wydarzeń - Instrukcja Konfiguracji

## Opis

Kalendarz wydarzeń zintegrowany z CMS Strapi, używający wtyczki `@offset-dev-strapi-calendar`.

## Wymagania

- Strapi CMS z zainstalowaną wtyczką `@offset-dev-strapi-calendar`
- Next.js 15+
- React 19+
- shadcn/ui komponenty (dialog)

## Komponenty

### Calendar.tsx

Główny komponent kalendarza używający FullCalendar z:

- Widokiem miesięcznym i tygodniowym
- Polskimi nazwami
- Obsługą kliknięć na wydarzenia

### DialogEventCalendar.tsx

Modal z szczegółami wydarzenia używający shadcn/ui Dialog:

- Pełne informacje o wydarzeniu
- Zdjęcie wydarzenia
- Data, czas, lokalizacja, kategoria
- Responsywny design z Twoimi zmiennymi SCSS

## Demo Dane

Przed podłączeniem do CMS, kalendarz używa demo danych do testowania funkcjonalności:

### Funkcja `getDemoEvents()`

- Generuje 8 przykładowych wydarzeń w bieżącym miesiącu
- Zawiera różne typy wydarzeń z kolorowymi kategoriami
- Używa prawdziwych zdjęć z Unsplash
- Automatycznie dostosowuje daty do bieżącego miesiąca

### Typy Demo Wydarzeń:

1. **Spotkania** (niebieski) - Spotkania zespołu
2. **Warsztaty** (zielony) - Warsztaty kreatywne
3. **Prezentacje** (żółty) - Prezentacje projektów
4. **Mentoring** (fioletowy) - Sesje mentoringowe
5. **Agile** (czerwony) - Retrospective sprint
6. **Development** (cyjan) - Code review
7. **Klient** (limonkowy) - Spotkania z klientem
8. **Szkolenia** (pomarańczowy) - Szkolenia techniczne

### Przełączanie na Rzeczywiste Dane

Po podłączeniu do CMS, zmień w `page.tsx`:

```typescript
// Z demo danych:
const eventsData = getDemoEvents()

// Na rzeczywiste dane:
const eventsData = await getEvents()
```

## Instalacja Wtyczki Strapi

1. W katalogu Strapi zainstaluj wtyczkę:

```bash
npm install @offset-dev-strapi-calendar
```

2. Skonfiguruj wtyczkę w `config/plugins.js`:

```javascript
module.exports = {
	'strapi-calendar': {
		enabled: true,
		config: {
			// Konfiguracja wtyczki
		},
	},
}
```

3. Uruchom ponownie Strapi

## Struktura Danych w Strapi

Wtyczka tworzy następujące pola dla wydarzeń:

- `title` - Tytuł wydarzenia
- `start` - Data i czas rozpoczęcia
- `end` - Data i czas zakończenia
- `description` - Opis wydarzenia (opcjonalne)
- `location` - Lokalizacja (opcjonalne)
- `image` - Zdjęcie wydarzenia (opcjonalne)
- `category` - Kategoria wydarzenia z kolorem (opcjonalne)

## Konfiguracja API

Endpoint API: `/api/events`

Przykładowa odpowiedź:

```json
{
	"data": [
		{
			"id": 1,
			"attributes": {
				"title": "Spotkanie",
				"start": "2024-01-15T10:00:00.000Z",
				"end": "2024-01-15T12:00:00.000Z",
				"description": "Opis spotkania",
				"location": "Sala konferencyjna",
				"image": {
					"data": {
						"attributes": {
							"url": "/uploads/image.jpg"
						}
					}
				},
				"category": {
					"data": {
						"attributes": {
							"name": "Spotkania",
							"color": "#3b82f6"
						}
					}
				}
			}
		}
	]
}
```

## Funkcjonalności

### Kalendarz

- Widok miesięczny i tygodniowy
- Polskie nazwy miesięcy i dni
- Kolorowe kategorie wydarzeń
- Responsywny design

### Modal Szczegółów (DialogEventCalendar)

- Pełne informacje o wydarzeniu
- Zdjęcie wydarzenia z efektem hover
- Data, czas, lokalizacja
- Kategoria z kolorem
- Własny przycisk zamknięcia
- Animacje i przejścia

### Interakcje

- Kliknięcie na wydarzenie otwiera modal
- Nawigacja między miesiącami/tygodniami
- Przycisk "Dzisiaj"

## Style i Responsywność

Kalendarz i modal są w pełni responsywne z:

- Użyciem Twoich zmiennych SCSS ($primary, $secondary, $text-color, etc.)
- Funkcją `rem()` do skalowania
- Breakpointami dla tabletów (768px) i telefonów (640px)
- Dostosowanymi rozmiarami przycisków i tekstu
- Optymalizacją dla małych ekranów

## Rozszerzenia

Możliwe rozszerzenia:

- Filtrowanie po kategoriach
- Wyszukiwanie wydarzeń
- Eksport do kalendarza (iCal)
- Integracja z Google Calendar
- Powiadomienia o wydarzeniach

## Rozwiązywanie Problemów

### Wydarzenia się nie wyświetlają

1. Sprawdź czy wtyczka jest zainstalowana i włączona
2. Sprawdź endpoint `/api/events` w Strapi
3. Sprawdź konfigurację CORS w Strapi

### Błędy TypeScript

1. Upewnij się że wszystkie typy są poprawnie zdefiniowane
2. Sprawdź importy z `@fullcalendar/core`
3. Sprawdź czy shadcn/ui dialog jest zainstalowany

### Problemy ze stylami

1. Sprawdź czy pliki SCSS są poprawnie skompilowane
2. Sprawdź czy klasy CSS są poprawnie zastosowane
3. Sprawdź czy zmienne SCSS są dostępne

## Testowanie Demo

1. Otwórz stronę `/kalendarz`
2. Sprawdź czy demo wydarzenia są wyświetlane
3. Kliknij na wydarzenie aby otworzyć modal
4. Przetestuj nawigację między miesiącami
5. Sprawdź responsywność na różnych urządzeniach
6. Przetestuj modal na różnych rozmiarach ekranu
