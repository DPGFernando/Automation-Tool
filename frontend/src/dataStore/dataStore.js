import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories`);
        setCategories(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };

}

export const useFetchSpecifications = (categoryId) => {
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) {
      setSpecs([]);
      return;
    }
    setLoading(true);
    const fetchSpecs = async () => {
      try {
        const res = await axios.get(`${API_URL}/specifications/${categoryId}`);
        const specsData = Array.isArray(res.data)
          ? res.data.flatMap(doc => doc.specifications || [])
          : res.data.specifications || [];
        setSpecs(specsData);
      } catch (error) {
        console.error("Error fetching specifications:", error);
        setSpecs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecs();
  }, [categoryId]);

  return { specs, loading };
};

export const useFetchTrustedSites = (categoryId) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) {
      setSites([]);
      return;
    }
    setLoading(true);
    const fetchSites = async () => {
      try {
        const res = await axios.get(`${API_URL}/trusted_sites/${categoryId}`);
        const sitesData = Array.isArray(res.data)
          ? res.data.flatMap(doc => doc.websites || [])
          : res.data.websites || [];
        setSites(sitesData);
      } catch (error) {
        console.error("Error fetching sites:", error);
        setSites([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, [categoryId]);

  return { sites, loading };
};

