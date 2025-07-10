import { useEffect, useState } from "react";
import axios from "axios";
import "./as.css";

const App2 = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const saveHistoryToLocalStorage = (newHistory) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA761iJ6vwRE2oOMZWWNPvv52XiRC7O5tw",
        {
          contents: [
            {
              parts: [{ text: input }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const generatedText =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        setResponse(generatedText);
        const newEntry = { query: input, answer: generatedText };
        const newHistory = [newEntry, ...history];
        setHistory(newHistory);
        saveHistoryToLocalStorage(newHistory);
      } else {
        setResponse("Ответ пустой или неожиданной структуры.");
      }
    } catch (err) {
      console.error(err);
      setError("Ошибка при запросе к Gemini API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <h1>Gemini AI Сұрақ-Жауап</h1>
      <div className="ask">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Введите запрос"
        />

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Загрузка..." : "Поиск"}
        </button>
      </div>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {response && (
        <div className="anser">
          <h3>Жауап:</h3>
          <p>{response}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="hello">
          <h3>Қойылған сұрақтар:</h3>
          <ul>
            {history.map((item, index) => (
              <li className="requests">
                <strong>Запрос:</strong> {item.query}
                <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App2;
