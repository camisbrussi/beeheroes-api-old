import createConnection from '../index';

async function create() {
  const connection = await createConnection();

  await connection.query(
    "INSERT INTO organization_types (id, name) VALUES (1, 'Assistência social'), (2, 'Cultura'), (3, 'Saúde'), (4, 'Meio ambiente'), (5, 'Desenvolvimento e defesa de direitos'), (6, 'Habitação'), (7, 'Educação e Pesquisa'), (8, 'Outro');",
  );
}

create().then(() => console.log('Organization Types Created'));
