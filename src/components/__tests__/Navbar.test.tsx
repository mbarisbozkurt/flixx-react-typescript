import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Helper function to render Navbar with routing
const renderNavbar = (route = '/') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Navbar />
    </MemoryRouter>
  );
};

describe('Navbar', () => {
  it('renders the logo with correct link and styling', () => {
    renderNavbar();
    
    const logo = screen.getByText('FLIXX');
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe('A');
    expect(logo).toHaveAttribute('href', '/');
    expect(logo).toHaveClass(
      'text-[22px]',
      'md:text-[25px]',
      'font-[900]',
      'uppercase',
      'text-white'
    );
  });

  it('renders navigation links', () => {
    renderNavbar();
    
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('TV Shows')).toBeInTheDocument();
  });

  it('applies correct active styles to Movies link when on home page', () => {
    renderNavbar('/');
    
    const moviesLink = screen.getByText('Movies');
    const tvShowsLink = screen.getByText('TV Shows');
    
    expect(moviesLink).toHaveClass('text-yellow-500', 'font-medium');
    expect(tvShowsLink).not.toHaveClass('text-yellow-500');
    expect(tvShowsLink).toHaveClass('text-white');
  });

  it('applies correct active styles to TV Shows link when on tv-shows page', () => {
    renderNavbar('/tv-shows');
    
    const moviesLink = screen.getByText('Movies');
    const tvShowsLink = screen.getByText('TV Shows');
    
    expect(tvShowsLink).toHaveClass('text-yellow-500', 'font-medium');
    expect(moviesLink).not.toHaveClass('text-yellow-500');
    expect(moviesLink).toHaveClass('text-white');
  });

  it('renders with correct responsive classes', () => {
    renderNavbar();
    
    const nav = screen.getByRole('navigation');
    const linkContainer = nav.querySelector('div.flex.gap-4');
    
    expect(nav).toHaveClass('container', 'mx-auto', 'px-4', 'max-w-7xl');
    expect(linkContainer).toHaveClass(
      'gap-4',
      'md:gap-6',
      'text-[14px]',
      'md:text-[16px]'
    );
  });
}); 