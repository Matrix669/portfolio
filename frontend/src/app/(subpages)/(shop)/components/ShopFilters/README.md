# ShopFilters - Dokumentacja

## Struktura folderów

```
ShopFilters/
├── config/
│   └── filters.ts          # Konfiguracja filtrów (kategorie, opcje)
├── hooks/
│   └── useShopFilters.ts   # Wspólny hook do zarządzania stanem filtrów
├── ShopFilters.tsx         # Główny komponent (wrapper dla mobile/desktop)
├── ShopFiltersDesktop.tsx  # Wersja desktop z Popover
├── ShopFiltersMobile.tsx   # Wersja mobile z Sheet
└── ShopFilters.module.scss # Style
```

## Jak to działa

### 1. Client-side filtering bez przeładowania strony
- Filtry zmieniają URL bez przeładowania (`router.replace` z `scroll: false`)
- `ProductListClient` nasłuchuje zmian w `searchParams` i pobiera produkty przez API
- Użytkownik widzi natychmiastową reakcję (optymistyczny UI)

### 2. Wspólny hook `useShopFilters`
Centralizuje całą logikę filtrów:
- **Synchronizacja z URL** - odczytuje i zapisuje parametry
- **Stan filtrów** - zarządza wartościami dla mobile i desktop
- **Active badges** - automatycznie oblicza aktywne filtry
- **API filters** - konwertuje do formatu wymaganego przez backend

### 3. Komponenty
- **ShopFilters.tsx** - wrapper renderujący wersję mobile i desktop
- **ShopFiltersDesktop.tsx** - używa `Popover` z shadcn/ui
- **ShopFiltersMobile.tsx** - używa `Sheet` z shadcn/ui
- Oba komponenty używają tego samego hooka `useShopFilters`

## Użycie

```tsx
// W page.tsx - server component
import ShopFilters from '../components/ShopFilters/ShopFilters'
import ProductListClient from '../components/ProductList/ProductListClient'

export default async function Shop({ searchParams }) {
  // Pobierz początkowe dane dla SSR
  const { products, pagination } = await loaderShopProducts(currentPage, filters)
  
  return (
    <>
      <ShopFilters />
      <ProductListClient 
        initialProducts={products} 
        initialPagination={pagination} 
      />
    </>
  )
}
```

## Dodawanie nowego filtra

1. Dodaj konfigurację w `config/filters.ts`:
```ts
{
  id: 'newFilter',
  superTtitle: 'Nowy Filtr',
  filterName: 'Wszystko',
  type: 'filter',
  filterContent: [
    { value: 'Wszystko' },
    { value: 'Opcja 1' },
  ],
  defaultValue: 'Wszystko',
}
```

2. Dodaj mapowanie w `hooks/useShopFilters.ts`:
```ts
const PARAM_KEY_MAP: Record<string, keyof FilterValues> = {
  // ...
  'Nowy Filtr': 'newFilter',
}
```

3. Filtr automatycznie pojawi się w UI (mobile i desktop)
