import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';

import { 
  GET_PORTFOLIOS, 
  CREATE_PORTFOLIO, 
  UPDATE_PORTFOLIO, 
  DELETE_PORTFOLIO,
  SIGN_IN,
  SIGN_OUT,
  GET_USER,
} from '@/apollo/queries';

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);

export const useCreatePortfolio = () => useMutation(CREATE_PORTFOLIO, {
  update(cache, { data: { createPortfolio } }) {
    const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
    const newPortfolios = [...portfolios, createPortfolio];

    cache.writeQuery({
      query: GET_PORTFOLIOS,
      data: { portfolios: newPortfolios }
    });
  }
});

export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO, {
  update(cache, { data: { deletePortfolio: deletedId } }) {
    const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
    const index = portfolios.findIndex(p => p._id === deletedId);
    const newPortfolios = [...portfolios];
    newPortfolios.splice(index, 1);

    cache.writeQuery({
      query: GET_PORTFOLIOS,
      data: { portfolios: newPortfolios }
    });
  }
});

export const useSignIn = () => useMutation(SIGN_IN, {
  update(cache, { data: { signIn: signedInUser }}) {
    cache.writeQuery({
      query: GET_USER,
      data: { user: signedInUser }
    })
  }
})

export const useLazyGetUser = () => useLazyQuery(GET_USER);

export const useSignOut = () => useMutation(SIGN_OUT);
