---
title: "pg_repack - full vacuum without table lock "
date: 2017-07-05
comments: true
slug: "/post/2017-07-05-pg_repack-full-vacuum-without-locking/"
promoted:
  - your
---

In **PostgreSQL**, an UPDATE or DELETE of a row does not immediately remove the old version of the row.
If you have application that does this massive batch UPDATEs or DELETEs your database can **grow in size pretty quickly**.

<!--more-->

At [ISE][ise_website] we develop plant performance monitoring application which collects hundreds (somtimes > 1000) of data counters ever minute.
This "minute-by-minute" data is later compressed into hourly slots.
This process involves massive DELETE operations every hour.

To reclaim disk space you need **FULL VACUUM**, but it **locks tables** which is a huge "no no" in 24-7-365 industry monitoring application.

**[pg_repack][pg_repack]** is a PostgreSQL extension tool that can do pretty much what FULL VACUUM does **without locking** (minimum locking to be precise).

## Installation

You can install from [source][pg_repack_source] or through pgxn.

```bash
apt-get install pgxnclient postgresql-server-dev-all
pgxn install pg_repack
psql -c "CREATE EXTENSION pg_repack" -d YOUR_DB_NAME -U postgres
```

## Usage

```bash
/usr/lib/postgresql/9.x/bin/pg_repack -d YOUR_DB_NAME -U postgres
```

## Notes

You will need around the same amount of space available as the table being repacked.
The reason is that pg_repack is actually creating a fresh copy of table without "dead" space and replacing old one with new (just as FULL VACUUM does)

P.S.

Of course it does not mean that you should abbandon your regulary scheduled vacuumimg and reindexing!

### Sources:

- [PostgreSQL rutine vacuuming documentation][postgresql_rutine_vacuuming]
- [PostgreSQL vacuum documentation][postgresql_vacuum]
- [pg_repack github project][pg_repack]
- [pg_repack pgxn site][pg_repack_source]

[ise_website]: http://http://isengineering.com/
[pg_repack]: https://github.com/reorg/pg_repack
[pg_repack_source]: https://pgxn.org/dist/pg_repack/
[postgresql_rutine_vacuuming]: https://www.postgresql.org/docs/9.2/static/routine-vacuuming.html
[postgresql_vacuum]: https://www.postgresql.org/docs/9.1/static/sql-vacuum.html
