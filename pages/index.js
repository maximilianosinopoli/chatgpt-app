import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [ocassion, setOcassion] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [relationship, setRelationship] = useState('');
  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budgetMax: budgetMax,
          budgetMin: budgetMin,
          ocassion: ocassion,
          hobbies: hobbies,
          relationship: relationship
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      // setResult(data.result[0].text);      
      setResult(data.result[0].text.replaceAll('\n', '<br />'));
      setBudgetMin('')
      setBudgetMax('')
      setOcassion('')
      setHobbies('')
      setRelationship('')
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Presents generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Presents generator</h3>
        <form onSubmit={onSubmit}>
          <label className={styles.label} htmlFor='minimum-budget'>Min budget:</label>
          <input
            type="text"
            id="minimum-budget"
            name="minimum-budget"
            placeholder="Enter the min budget"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
            required={true}
          />
          <label className={styles.label} htmlFor='minimum-budget'>Max budget:</label>
          <input
            id="maximum-budget"
            type="text"
            name="maximum-budget"
            placeholder="Enter the max budget"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
            required={true}
          />
          <label className={styles.label} htmlFor='ocassion'>Ocassion:</label>
          <input
            id='ocassion'
            type="text"
            name="ocassion"
            placeholder="Enter occasion: birthday, valentines"
            value={ocassion}
            onChange={(e) => setOcassion(e.target.value)}
            required={true}
          />
          <label className={styles.label} htmlFor='relation'>Relation:</label>
          <input
            id='relation'
            type="text"
            name="relationship"
            placeholder="Enter relation: friend, colleague"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            required={true}
          />
          <label className={styles.label} htmlFor='minimum-budget'>Hobbies:</label>
          <input
            id='hobbies'
            type="text"
            name="hobbies"
            placeholder="Enter hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            required={true}
          />
          <input type="submit" value="Generate presents" />
        </form>
        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}
