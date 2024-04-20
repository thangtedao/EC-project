import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Wrapper from "../assets/wrappers/Search.js";
import { useEffect, useState } from "react";
import customFetch from "../utils/customFetch";
import NovaIcon from "../assets/logo/LogoNova.svg";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { ProductList } from "../components";
import { debounce } from "lodash";

const SearchPage = () => {
  const { keyword } = useParams();

  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState(
    `/product/search/?name=${keyword}&page=1&limit=20&status=Available`
  );
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [filterType, setFilterType] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get(
          `/product/search/?name=${keyword}&page=1&limit=20&status=Available`
        );
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  const loadMore = debounce(async () => {
    try {
      setIsLoading(true);
      const fetchData = await customFetch.get(url).then(({ data }) => data);
      setProducts([...products, ...fetchData]);
    } catch (error) {
      if (error?.response?.status === 404) setIsShow(false);
      else console.log(error);
    } finally {
      setIsLoading(false);
      setPage(page + 1);
      console.log(page);
    }
  }, 200);

  const filterLowToHigh = debounce(async () => {
    try {
      setIsLoading(true);
      setFilterType("lth");
      setUrl(
        `/product/search/?name=${keyword}&page=${page}&limit=20&status=Available&sort=salePrice`
      );

      let endpoint = `/product/search/?name=${keyword}&page=1&limit=20&status=Available&sort=salePrice`;
      const fetchData = await customFetch
        .get(endpoint)
        .then(({ data }) => data);
      setProducts(fetchData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsShow(true);
      setPage(2);
    }
  }, 300);

  const filterHighToLow = debounce(async () => {
    try {
      setIsLoading(true);
      setFilterType("htl");
      setUrl(
        `/product/search/?name=${keyword}&page=${page}&limit=20&status=Available&sort=-salePrice`
      );

      let endpoint = `/product/search/?name=${keyword}&page=1&limit=20&status=Available&sort=-salePrice`;
      const fetchData = await customFetch
        .get(endpoint)
        .then(({ data }) => data);
      setProducts(fetchData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsShow(true);
      setPage(2);
    }
  }, 300);

  useEffect(() => {
    switch (filterType) {
      case "htl":
        setUrl(
          `/product/search/?name=${keyword}&page=${page}&limit=20&status=Available&sort=-salePrice`
        );
        break;

      case "lth":
        setUrl(
          `/product/search/?name=${keyword}&page=${page}&limit=20&status=Available&sort=salePrice`
        );
        break;

      case "mv":
        setUrl(
          `/product/search/?name=${keyword}&page=${page}&limit=20&status=Available&sort=-viewed`
        );
        break;

      default:
        setUrl(
          `/product/search/?name=${keyword}&page=${page}&limit=20&status=Available`
        );
        break;
    }
  }, [page]);

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Search: {keyword}</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <div className="title">Sắp xếp theo</div>

        <div className="filter-buttons">
          <div className="filter-button" onClick={() => filterHighToLow()}>
            <FaSortAmountDown />
            Giá Cao - Thấp
          </div>
          <div className="filter-button" onClick={() => filterLowToHigh()}>
            <FaSortAmountUp />
            Giá Thấp - Cao
          </div>
        </div>

        <ProductList products={products} />

        {isShow && (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}
            onClick={() => loadMore()}
          >
            <span className="load-btn">
              {isLoading ? "Loading" : "Xem thêm"}
            </span>
          </div>
        )}
      </Wrapper>
    </HelmetProvider>
  );
};

export default SearchPage;
