import React from "react";
import { useSelector } from "react-redux";

const ResponseDisplay = () => {
  const { data, loading, error, endpoint, method } = useSelector(
    (state) => state.api,
  );

  if (loading) return <div className="loader"> Loading...</div>;
  if (error) return <div className="error-msg"> Error: {error}</div>;
  if (!data) return null;

  const imageUrl = Array.isArray(data)
    ? data[0]?.url || data[0]?.image?.url
    : data?.image?.url ||
      data?.url ||
      (data?.image_id
        ? `https://cdn2.thecatapi.com/images/${data.image_id}.jpg`
        : null);

  return (
    <div className="output-card">
      <h3>Output Displayed:</h3>
      <p>
        <strong>API Endpoint:</strong> {endpoint}
      </p>
      <p>
        <strong>Method:</strong> {method}
      </p>
      <p className="status-success"> Status: Success (200)</p>

      {imageUrl ? (
        <div className="image-preview">
          <strong>Preview:</strong> <br />
          <img
            src={imageUrl}
            alt="API Result"
            style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "10px" }}
          />
        </div>
      ) : (
        <p>No image URL found in response.</p>
      )}

      <div className="data-display">
        <strong>Raw JSON Data:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ResponseDisplay;
