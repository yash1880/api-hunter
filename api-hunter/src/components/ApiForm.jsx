import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest, axiosRequest, setRequest } from "../store/apiSlice";

const ApiForm = () => {
  const [url, setUrl] = useState("https://api.thecatapi.com/v1/images/search");
  const [method, setMethod] = useState("GET");
  const [postData, setPostData] = useState({ title: "Test", userId: 1 });
  const [requestId, setRequestId] = useState(null); // Unique ID for each request

  const dispatch = useDispatch();
  const { loading, data, error, currentUrl, currentMethod } = useSelector(
    (state) => state.api,
  );

  const handleApiCall = async (type) => {
    const id = Date.now();
    setRequestId(id);

    dispatch(setRequest({ url, method }));
    const params = { url, method, body: postData };

    if (type === "fetch") {
      await dispatch(fetchRequest(params));
    } else {
      await dispatch(axiosRequest(params));
    }
  };

  const getImageUrl = () => {
    if (!data) return null;
    if (
      currentUrl?.includes("thecatapi") &&
      Array.isArray(data) &&
      data[0]?.url
    )
      return data[0].url;
    if (currentUrl?.includes("thecatapi") && data.url) return data.url;
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "12px",
          background: "#fff",
        }}
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <div style={{ marginBottom: "15px", textAlign: "center" }}>
          <button
            onClick={() => setMethod("GET")}
            style={{
              marginRight: "10px",
              padding: "10px 25px",
              background: method === "GET" ? "#0066cc" : "#f0f0f0",
              color: method === "GET" ? "#fff" : "#333",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            GET
          </button>
          <button
            onClick={() => setMethod("POST")}
            style={{
              padding: "10px 25px",
              background: method === "POST" ? "#28a745" : "#f0f0f0",
              color: method === "POST" ? "#fff" : "#333",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            POST
          </button>
        </div>

        {method === "POST" && (
          <textarea
            value={JSON.stringify(postData, null, 2)}
            onChange={(e) => {
              try {
                setPostData(JSON.parse(e.target.value));
              } catch (err) {}
            }}
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontFamily: "monospace",
            }}
          />
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => handleApiCall("fetch")}
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px",
              background: "#0066cc",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading ? "loading..." : " Fetch"}
          </button>
          <button
            onClick={() => handleApiCall("axios")}
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading ? "loading..." : " Axios"}
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          ⏳ Loading...
        </div>
      )}

      {!loading && error && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#fee",
            borderRadius: "8px",
            color: "#c00",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default ApiForm;
