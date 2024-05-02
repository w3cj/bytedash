# Byte Dash

A restaurant food delivery service database implemented with [drizzle](https://orm.drizzle.team/).

View the dbdocs diagram [here](https://dbdocs.io/w3cj/bytedash?schema=public&view=relationships).

```mermaid
erDiagram
	address {
		Int id PK  "autoincrement()"
		String street_address_1
		String street_address_2  "nullable"
		String zip_code
		String delivery_instructions  "nullable"
		Int user_id FK
		Int city_id FK
		DateTime created_at  "now()"
		DateTime updated_at  "now()"
	}
	category {
		Int id PK  "autoincrement()"
		String name
	}
	city {
		Int id PK  "autoincrement()"
		String name
		Int state_id FK
	}
	comment {
		Int id PK  "autoincrement()"
		Int order_id FK
		Int user_id FK
		String comment_text
		Boolean is_complaint
		Boolean is_praise
		DateTime created_at  "now()"
		DateTime updated_at  "now()"
	}
	driver {
		Int id PK  "autoincrement()"
		String car_make
		String car_model
		Int car_year
		Int user_id FK
		Boolean online
		Boolean delivering
		DateTime created_at  "now()"
		DateTime updated_at  "now()"
	}
	menu_item {
		Int id PK  "autoincrement()"
		String name
		Int restaurant_id FK
		Int category_id FK
		String description
		String ingredients
		Decimal price
		Boolean active
		DateTime created_at  "now()"
		DateTime updated_at  "now()"
	}
	order_menu_item {
		Int id PK  "autoincrement()"
		Int order_id FK
		Int menu_item_id FK
		Int quantity
		Decimal item_price
		Decimal price
		String comment  "nullable"
	}
	order_status {
		Int id PK  "autoincrement()"
		Int order_id FK
		Int status_catalog_id FK
		DateTime created_at  "now()"
	}
	orders {
		Int id PK  "autoincrement()"
		Int restaurant_id FK
		DateTime estimated_delivery_time
		DateTime actual_delivery_time  "nullable"
		Int delivery_address_id FK
		Int user_id FK
		Int driver_id FK  "nullable"
		Decimal price
		Decimal discount
		Decimal final_price
		String comment  "nullable"
		DateTime created_at  "now()"
		DateTime updated_at  "now()"
	}
	restaurant {
		Int id PK  "autoincrement()"
		String name
		String street_address
		String zip_code
		Int city_id FK
		DateTime created_at  "now()"
		DateTime updated_at  "now()"
	}
	state {
		Int id PK  "autoincrement()"
		String name
		String code
	}
	status_catalog {
		Int id PK  "autoincrement()"
		String name
	}
	users {
		Int id PK  "autoincrement()"
		String name
		String contact_phone
		Boolean phone_verified
		String email
		Boolean email_verified
		String confirmation_code  "nullable"
		String password
		DateTime created_at  "now()"
		DateTime updated_at  "now()"
	}
	restaurant_owner {
		Int id PK  "autoincrement()"
		Int restaurant_id FK
		Int owner_id FK
	}
	address }o--|| city : city
	address }o--|| users : users
	city }o--|| state : state
	comment }o--|| orders : orders
	comment }o--|| users : users
	driver }o--|| users : users
	menu_item }o--|| category : category
	menu_item }o--|| restaurant : restaurant
	order_menu_item }o--|| menu_item : menu_item
	order_menu_item }o--|| orders : orders
	order_status }o--|| orders : orders
	order_status }o--|| status_catalog : status_catalog
	orders }o--|| address : address
	orders }o--|| driver : driver
	orders }o--|| restaurant : restaurant
	orders }o--|| users : users
	restaurant }o--|| city : city
	restaurant_owner }o--|| users : users
	restaurant_owner }o--|| restaurant : restaurant

```

# Getting Started

## Create .env file

Copy the `.env.sample` file and update the values accordingly. If you are using `docker compose` you can leave the values as is.

```sh
cp .env.sample .env
```

## Start A PostgreSQL Database with Docker Compose

```sh
docker compose up
```

## Migrate the DB

```sh
npm run db:migrate
```

## Seed the DB

```sh
npm run db:seed
```

## Start the Example API

```sh
npm run dev:api
```

## Run the API Client

```sh
npm run dev:client
```