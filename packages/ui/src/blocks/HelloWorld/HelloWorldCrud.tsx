import { useState, type FormEvent } from "react";
import { useCreateHelloWorld, useDeleteHelloWorld, useHelloWorld } from "@specstack/drupal-sdk";

export function HelloWorldCrud() {
  const [title, setTitle] = useState("");
  const helloWorld = useHelloWorld();
  const createHelloWorld = useCreateHelloWorld();
  const deleteHelloWorld = useDeleteHelloWorld();
  const items = helloWorld.data?.data ?? [];

  async function createItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await createHelloWorld.mutateAsync({ title });
    setTitle("");
  }

  async function deleteItem(id: number) {
    await deleteHelloWorld.mutateAsync(id);
  }

  return (
    <section>
      <h2>Hello World CRUD Demo</h2>
      {helloWorld.isLoading ? <p>Loading hello-world items...</p> : null}
      {helloWorld.error ? <p role="alert">Unable to load hello-world items.</p> : null}
      <form onSubmit={createItem}>
        <label>
          Title
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <button className="ssk-button" type="submit" disabled={createHelloWorld.isPending}>
          Create
        </button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title}
            <button
              type="button"
              disabled={deleteHelloWorld.isPending}
              onClick={() => void deleteItem(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
