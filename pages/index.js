import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [options, setOptions] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [ocassion, setOcassion] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [relationship, setRelationship] = useState("");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          options: options,
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

      setResult(JSON.parse(data.result[0].text));
      console.log(JSON.parse(data.result[0].text))
      
      setOptions('')
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
        <title>Get the perfect present!</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Get the perfect present!</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="options"
            placeholder="Hoy many options do you want to get?"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            required={true}
          />
          <input
            type="text"
            name="minimum-budget"
            placeholder="Enter the minimum budget"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
          />
          <input
            type="text"
            name="maximum-budget"
            placeholder="Enter the maximum budget"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
          />
           <input
            type="text"
            name="ocassion"
            placeholder="Enter occasion: Birthday, Valentines"
            value={ocassion}
            onChange={(e) => setOcassion(e.target.value)}
          />
          <input
            type="text"
            name="relationship"
            placeholder="Enter relationship Friend, Colleague"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
          <input
            type="text"
            name="hobbies"
            placeholder="Enter hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
          <input type="submit" value="Generate a present" />
        </form>
        {result ? <div className={styles.result}>
          {result.map((item, i) => {
            return (
              <div key={i} className={styles.red}>
                <p><span className={styles.underline}>Item:</span> {item.product}</p>
                <p><span className={styles.underline}>Price:</span> {item.price}</p>
                <p>{item.why_might_be_a_good_present}</p>
                <a target="_blank" href={item.where_to_buy_it}>Explore some options</a>
              </div>
            )
          })}
        </div> : null}  
      </main>
    </div>
  );
}
