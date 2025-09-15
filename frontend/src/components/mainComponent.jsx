import React, { useState, useEffect } from 'react';
import { useFetchCategories, useFetchSpecifications, useFetchTrustedSites } from '../dataStore/dataStore';
import { promptTemplate } from '../prompts/prompts';

function mainComponent() {

    const { categories, loading } = useFetchCategories();
    const [selectedCategory, setSelectedCategory] = useState("");
    const { specs, loading: specsLoading } = useFetchSpecifications(selectedCategory);
    const { sites, loading: sitesLoading } = useFetchTrustedSites(selectedCategory);
    const [geminiOutput, setGeminiOutput] = useState("");
    const [loadingGemini, setLoadingGemini] = useState(false);
    const [geminiDescription, setGeminiDescription] = useState("");
    const [downloadLink, setDownloadLink] = useState("");

    const [modelInput, setModelInput] = useState("");
    const [modelsArray, setModelsArray] = useState([]);

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleModelInputChange = (event) => {
        setModelInput(event.target.value);
    };

    const handleAddModel = () => {
        if (modelInput.trim() !== "") {
            setModelsArray([...modelsArray, modelInput.trim()]);
            setModelInput("");
        }
    };

    const categoryText = categories.find(cat => cat._id === selectedCategory)?._catname || "";
    const models = modelsArray.join(", ");
    const specificationsText = specs.join(", ");
    const sitesText = sites.join(", ");

    const promptText = promptTemplate
        .replaceAll("${category}", categoryText)
        .replace("${models}", models)
        .replace("${specifications}", specificationsText)
        .replace("${sites}", sitesText);

    useEffect(() => {
        if (selectedCategory) {
            console.log("Generated Prompt:\n", promptText);
        }
    }, [promptText, selectedCategory]);

    const handleGeminiRequest = async () => {
        setLoadingGemini(true);
        setGeminiOutput("");
        setDownloadLink("");
        setGeminiDescription("");

        try {
            const response = await fetch("/api/gemini/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: promptText })
            });

            const data = await response.json();

            if (response.ok) {
                setGeminiDescription(`${data.description}\n\n(Generated in ${data.attempts} attempt(s))`);

                if (data.downloadUrl) {
                    setDownloadLink(data.downloadUrl);
                } else {
                    setDownloadLink("");
                    setGeminiOutput("⚠️ Gemini returned description only (no CSV found).");
                }
            }
        } catch (error) {
            setGeminiOutput("Error: " + error.message);
        } finally {
            setLoadingGemini(false);
        }
    };

    const handleClearAll = () => {
        setSelectedCategory("");
        setModelInput("");
        setModelsArray([]);
        setGeminiDescription("");
        setDownloadLink("");
        setGeminiOutput("");
    };



    return (
        <div>
            <h3>Select Category</h3>
            {loading ? (
                <p>Loading categories...</p>
            ) : (
                <select value={selectedCategory} onChange={handleChange}>
                    <option value="">-- Select a Category --</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {Array.isArray(cat._catname) ? cat._catname.join(", ") : cat._catname}
                        </option>
                    ))}
                </select>
            )}

            <div style={{ margin: "20px" }}>
                <input
                    type="text"
                    value={modelInput}
                    onChange={handleModelInputChange}
                    placeholder="Enter model name"
                />
                <button onClick={handleAddModel}>Add</button>
            </div>

            {modelsArray.length > 0 && (
                <div>
                    <h4>Models:</h4>
                    <ul>
                        {modelsArray.map((model, idx) => (
                            <li key={idx}>{model}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div style={{ margin: "20px 0" }}>
                <button onClick={handleGeminiRequest} disabled={loadingGemini}>
                    {loadingGemini ? "Generating..." : "Get Gemini Output"}
                </button>
            </div>

            <div style={{ margin: "10px 0" }}>
                <button
                    onClick={handleClearAll}
                    style={{
                        backgroundColor: "#ff4d4f",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    🧹 Clear All
                </button>
            </div>

            <div>
                {loadingGemini && <p>Loading Gemini Output...</p>}

                <div
                    style={{
                        backgroundColor: "#f9f9f9",
                        color: "#333",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        maxHeight: "250px",
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.5",
                        fontFamily: "Segoe UI, Roboto, sans-serif",
                        fontSize: "15px",
                    }}
                >
                    {geminiDescription}
                </div>
                {downloadLink && (
                    <div>
                        <h3>Specifications Excel</h3>
                        <a
                            href={downloadLink}
                            download
                            style={{
                                color: "white",
                                backgroundColor: "#007bff",
                                padding: "8px 16px",
                                borderRadius: "5px",
                                textDecoration: "none"
                            }}
                        >
                            📥 Download Excel
                        </a>
                    </div>
                )}
            </div>

        </div>
    )
}

export default mainComponent