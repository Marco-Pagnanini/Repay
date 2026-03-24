# Repay

Repay è un'app mobile per tracciare i tuoi abbonamenti ricorrenti. Tieni sotto controllo quanto spendi ogni mese, visualizza lo storico dei rinnovi e ricevi notifiche prima di ogni scadenza.

## Features

- Aggiunta e gestione abbonamenti (mensile, settimanale, annuale)
- Calcolo automatico del totale speso nel mese corrente
- Rinnovi automatici — ad ogni avvio l'app calcola le transazioni mancanti
- Storico transazioni filtrato per mese
- Notifiche prima del rinnovo
- Design dark ispirato a Revolut e Notion

## Stack

- **React Native** con Expo SDK 55
- **Expo Router** per la navigazione (file-based routing)
- **Drizzle ORM** + **Expo SQLite** per il database locale
- **Expo Blur** per gli effetti di sfondo
- **Expo Notifications** per le notifiche locali

## Architettura

Il progetto segue un'architettura ispirata a **CQRS** con tre tabelle principali:

- `subscriptions` — master data degli abbonamenti attivi
- `transactions` — log immutabile di ogni rinnovo avvenuto
- `amount` — proiezione del totale speso aggregato

Le scritture avvengono sempre tramite command functions nel layer `services/`, le letture tramite query separate ottimizzate per ogni schermata.

## Struttura

```
app/
  (tabs)/
    _layout.tsx         tab bar
    index.tsx           home — totale mensile e transazioni
    subscriptions.tsx   lista abbonamenti attivi
  _layout.tsx           root layout — migrations e provider
  add-subscription.tsx  modal aggiunta abbonamento

components/
  CardAmount.tsx        card saldo con fade-in
  TransactionCard.tsx   riga transazione
  SubscriptionCard.tsx  card abbonamento

db/
  schema.ts             definizione tabelle Drizzle
  database.ts           client SQLite singleton
  migrations.ts         creazione tabelle al primo avvio

services/
  storage.ts            query e command
  renewalService.ts     logica rinnovi automatici

types/
  Subscription.ts
  Transaction.ts
```

## Avvio

### Requisiti

- Node.js >= 20.19.4
- Expo CLI
- iOS Simulator (Xcode) o dispositivo fisico con Expo Go

### Installazione

```bash
git clone https://github.com/tuo-username/repay.git
cd repay
npm install
```

### Avvio

```bash
npx expo start
```

Premi `i` per aprire il simulatore iOS o scansiona il QR code con Expo Go.

## Font

L'app usa tre font da Google Fonts:

- **Fraunces** — titoli e heading
- **Inter** — corpo testo e label
- **DM Mono** — valori monetari e numeri

## Note

Il database SQLite viene creato automaticamente al primo avvio sul device. Non è necessaria nessuna configurazione aggiuntiva — le tabelle vengono create tramite `runMigrations()` nel layout root prima che qualsiasi schermata venga renderizzata.