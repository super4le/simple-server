import express from "express";

const app = express();

app.use(express.json());

let cnt = 0;



interface BlogPost {
    title: string;
    date: Date;
    body: string;
    id: number;
    draft: boolean;
}

let posts: BlogPost[] = [];

app.get('/posts/', (req, res) => {
  res.send(posts);
});

app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id == id);
  if (!post) {
    return res.status(404).send({msg: 'not found' });
  }
  res.send(post);
});

app.put('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const postData = req.body;
  const postToUpdateIndex = posts.findIndex((post) => post.id == id);
  if (!posts[postToUpdateIndex]) {
    return res.status(404).send({msg: 'not found' });
  }
  posts[postToUpdateIndex] = {
    ...posts[postToUpdateIndex],
    title: postData.title,
    body: postData.body,
  }
  return res.send(posts[postToUpdateIndex]);
});

app.delete('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const postToDelete = posts.find((post) => post.id == id);
  if (!postToDelete) {
    return res.status(404).send({msg: 'not found' });
  }
  posts = posts.filter((post) => post.id != id);
  return res.send(postToDelete);
});

app.post('/posts/', (req, res) => {
  const postData = req.body;
  const lastPost = posts[posts.length - 1];
  const newPost: BlogPost = {
    id: lastPost ? lastPost.id + 1 : 0,
    date: new Date(),
    draft: false,
    title: postData.title, 
    body: postData.body
  };
  posts.push(newPost);
  return res.status(201).send(newPost);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server started ad http://localhost:3000');
});
