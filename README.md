# SAIT College Gate Pass Management System

A comprehensive web application for managing entry and exit of students, staff, visitors, and vehicles at SAIT College. This system streamlines the process of issuing, approving, and tracking gate passes.

## Features

- **Dashboard**: View summary statistics of gate passes by status and type
- **Gate Pass Management**:
  - Student Entry Management
  - Staff Entry Management 
  - Visitor Entry Management
  - Vehicle Entry Management
- **QR Code Scanning**: Scan QR codes for quick validation of gate passes
- **ID Card Generation**: Generate digital ID cards for students and staff
- **Admin Dashboard**: Manage and approve gate pass requests
- **Pass History**: Track all historical gate pass data
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Support for user theme preferences

## Tech Stack

- **Frontend**: 
  - Next.js 15.x
  - React 19.x
  - TailwindCSS for styling
  - Radix UI components
  - Lucide React for icons
  - Recharts for data visualization

- **Backend**:
  - MongoDB for database storage
  - Next.js API routes for server functionality

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or pnpm package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/gate-pass-system.git
   cd gate-pass-system
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application

### Building for Production

```bash
npm run build
# or
pnpm build
```

To start the production server:

```bash
npm run start
# or
pnpm start
```

## Project Structure

```
gate-pass-system/
├── app/                   # Next.js app directory
│   ├── admin/             # Admin interface
│   ├── gate-pass-history/ # History of all gate passes
│   ├── id-card-generator/ # ID card generation
│   ├── staff-entry/       # Staff entry management
│   ├── student-entry/     # Student entry management
│   ├── vehicle-entry/     # Vehicle entry management
│   ├── visitor-entry/     # Visitor entry management
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # UI components (buttons, forms, etc.)
│   ├── entry-form.tsx     # Form for entry creation
│   ├── gate-pass-table.tsx # Table for displaying gate passes
│   ├── navigation-menu.tsx # Navigation component
│   ├── qr-scanner.tsx     # QR code scanner component
│   └── vehicle-ticket.tsx # Vehicle ticket component
├── lib/                   # Utility functions and data
│   ├── actions.ts         # Server actions
│   ├── data.ts            # Mock data
│   ├── mongodb.ts         # MongoDB connection
│   └── utils.ts           # Utility functions
└── public/                # Static files
```

## Configuration

The application can be configured through environment variables:

```
MONGODB_URI=your_mongodb_connection_string
```

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [MongoDB](https://www.mongodb.com/)
