
Example query:


```

Connection conn = Connection::getConnection();

Query q = new Query()
    .select("applications")
    .where("status", "=", 1)
;

RelationArray applications = await conn.fetchAll(q);
RelationArray modificators = await applications.resolve("app_modificators");
RelationArray templates_versions = await applications.resolve("templates_versions");
RelationArray templates = await templates_versions.resolve("templates");
RelationArray yaml_files = await applications.resolve("yaml_files");

Collection<Application> items = applications.toModel();

/* Returns Collection of integers */
log( items[0].get("modificators") );


```
