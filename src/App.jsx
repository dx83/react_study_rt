import React, { useState } from 'react';

const Header = (props) => {
  //console.log('props', props.title);
  return (
    <header>
      <h1><a href="/" onClick={event => {
        event.preventDefault();
        props.iCallFunc();
      }}>{props.jemok}</a></h1>
    </header>
  )
}

const Nav = (props) => {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={`/read/${t.id}`} onClick={(event) => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></li>);
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

const Article = (props) => {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

const Create = (props) => {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body" /></p>
        <p><input type="submit" value="create" /></p>
      </form>
    </article>
  )
}

const Immutable = () => {
  //const [values, setValues] = useState([1]);  // 변화 없음
  //const [values, setValues] = useState(1);  // 즉시 변함
  const [values, setValues] = useState([1]);

  return (
    <article>
      <h3>Immutable</h3>
      <a onClick={() => {
        //values.push(2);      // 변화 없음
        //setValues(values+1); // 즉시 변함
        const newValue = [...values];
        newValue.push(values[values.length - 1] + 1);
        setValues(newValue);
      }}>{values}</a>
    </article>
  )
}

const App = () => {


  //const _mode = useState('WELCOME');
  //console.log('_mode', _mode);
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  //const topics = [
  //  { id: 1, title: 'html', body: 'html is ...' },
  //  { id: 2, title: 'css', body: 'css is ...' },
  //  { id: 3, title: 'javascript', body: 'javascript is ...' },
  //]
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ]);

  //const mode = "WELCOME";
  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web"></Article>
  }
  else if (mode === 'READ') {
    //content = <Article title="Welcome" body="Hello, Read"></Article>
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      //console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <li><a href={`/update/${id}`}>Update</a></li>
  }
  else if (mode === 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const newTopic = { id: nextId, title: title, body: body }
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>
  }

  return (
    <div style={{ marginLeft: "30px" }}>
      <Header jemok="WEB"
        iCallFunc={() => {
          //mode = 'WELCOME';
          setMode('WELCOME');
        }}>
      </Header>

      <Nav topics={topics} onChangeMode={(id) => {
        //mode = "READ";
        setMode('READ');
        setId(id);
      }}>
      </Nav>

      {content}
      <br />

      <ul>
        <li>
          <a href="/create" onClick={event => {
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a>
        </li>
        {contextControl}
      </ul>

      {/*<Immutable />*/}
    </div>
  );
};

export default App;