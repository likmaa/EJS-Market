import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { WishlistButton } from '@/components/WishlistButton';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<WishlistProvider>{component}</WishlistProvider>);
};

describe('WishlistButton', () => {
  const mockProduct = {
    productId: '1',
    sku: 'SKU-001',
    name: 'Test Product',
    priceHT: 10000,
    vatRate: 0.2,
    image: 'https://example.com/image.jpg',
    brand: 'Test Brand',
  };

  it('renders correctly', () => {
    renderWithProvider(<WishlistButton {...mockProduct} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('adds product to wishlist on click', () => {
    renderWithProvider(<WishlistButton {...mockProduct} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    // Vérifier que le produit est ajouté (le bouton devrait changer d'état)
    expect(button).toHaveClass('bg-violet-electric');
  });

  it('removes product from wishlist when already in wishlist', () => {
    renderWithProvider(<WishlistButton {...mockProduct} />);
    const button = screen.getByRole('button');
    
    // Ajouter d'abord
    fireEvent.click(button);
    expect(button).toHaveClass('bg-violet-electric');
    
    // Puis retirer
    fireEvent.click(button);
    expect(button).not.toHaveClass('bg-violet-electric');
  });

  it('has correct aria-label when not in wishlist', () => {
    renderWithProvider(<WishlistButton {...mockProduct} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', `Ajouter ${mockProduct.name} à la liste de souhaits`);
  });

  it('has correct aria-label when in wishlist', () => {
    renderWithProvider(<WishlistButton {...mockProduct} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(button).toHaveAttribute('aria-label', `Retirer ${mockProduct.name} de la liste de souhaits`);
  });
});

