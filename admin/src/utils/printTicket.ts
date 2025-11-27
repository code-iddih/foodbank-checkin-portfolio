/**
 * @fileoverview Print ticket utility for Foodbank Check-In and Appointment System admin panel
 * 
 * This module provides unified print ticket functionality for the admin panel.
 * All print ticket operations should use this utility to ensure consistency
 * and proper ticket generation.
 * 
 * Best Practices Implemented:
 * - Centralized ticket printing: All print buttons use this utility
 * - Consistent data source: All tickets use the same backend endpoint
 * - Same data structure: All tickets display the same information
 * - Error handling: Validates check-in ID before printing
 * - Authentication: Uses authenticated API requests for security
 * - User feedback: Provides error messages and loading states
 * 
 * IMPORTANT: All admin features with print icons MUST use this utility
 * to ensure consistent ticket generation across the application.
 * 
 * Security Improvements:
 * - Fetches ticket with authentication token (secure)
 * - Opens as blob URL (prevents token exposure in URL)
 * - Handles authentication errors gracefully
 * - Validates responses before opening
 * 
 * Verified Print Icon Locations (all use this utility):
 * - CheckInsPage.tsx: handlePrintTicket() -> printTicket()
 * - RecentCheckInsList.tsx: onClick -> printTicket()
 * - ClientDetailPage.tsx: handlePrint() -> printTicket()
 * 
 * Auto-Generated Appointment Flow:
 * 1. Client checks in via POST /api/checkin
 * 2. Backend auto-generates next appointment (21+ days from today, preserves time)
 *    - Uses calculateNextAppointmentDate() to add 21 days and adjust for weekdays/holidays
 *    - Uses getNextValidTime() to preserve original appointment time (around the same time)
 * 3. Appointment stored in check-in record (nextAppointmentISO, nextAppointmentDate, nextAppointmentTime)
 * 4. Same appointment data sent to client during check-in process (in response)
 * 5. Ticket generation (GET /api/tickets/:checkInId) displays this auto-generated appointment
 * 6. Admin can edit appointment via PUT /api/admin/appointments/:checkInId/update-next-date
 * 7. Updated appointment appears on tickets and throughout admin panel
 * 
 * @author Lindsey D. Stead
 * @version 2.0.0
 * @since 2025-10-20
 * @license Proprietary - see LICENSE file for details
 * 
 * @see {@link ../common/apiConfig.ts} API configuration
 * @see {@link ../lib/api.ts} Authenticated API client
 * @see {@link ../../backend/src/routes/tickets.ts} Backend ticket generation
 * @see {@link ../../backend/src/utils/appointmentScheduler.ts} Auto-scheduling logic (21+ days, preserves time)
 */

import { api } from '../lib/api';

/**
 * Print ticket options for error handling and user feedback
 */
export interface PrintTicketOptions {
  onError?: (error: string) => void;
  onLoading?: () => void;
}

/**
 * Print ticket for a check-in record
 * 
 * This function fetches the HTML ticket with authentication, then opens it
 * in a new window for printing. This ensures security and proper error handling.
 * 
 * The ticket includes:
 * - Client name and information
 * - Next appointment date and time (auto-generated)
 * - Household size and dietary requirements
 * - Special requests and mobility assistance
 * - Pickup instructions
 * 
 * @param checkInId - The unique identifier for the check-in record
 * @param options - Optional callbacks for error handling and loading states
 * 
 * @example
 * ```tsx
 * <Button onClick={() => printTicket(checkIn.id, {
 *   onError: (error) => toast({ title: 'Error', description: error, status: 'error' }),
 *   onLoading: () => toast({ title: 'Loading ticket...', status: 'info' })
 * })}>
 *   Print Ticket
 * </Button>
 * ```
 */
export const printTicket = async (
  checkInId: string,
  options?: PrintTicketOptions
): Promise<void> => {
  if (!checkInId) {
    const error = 'No check-in ID provided';
    console.error('Print ticket:', error);
    options?.onError?.(error);
    return;
  }
  
  options?.onLoading?.();
  
  try {
    // Fetch ticket with authentication using the api() function
    // This automatically includes the Supabase auth token
    const response = await api(`/tickets/${checkInId}`, {
      method: 'GET',
    });
    
    // Handle authentication errors
    if (response.status === 401) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    // Handle not found errors
    if (response.status === 404) {
      throw new Error('Ticket not found. The check-in may have been deleted.');
    }
    
    // Handle validation errors
    if (response.status === 400) {
      throw new Error('Invalid ticket ID format.');
    }
    
    // Handle rate limiting
    if (response.status === 429) {
      throw new Error('Too many requests. Please wait a moment before trying again.');
    }
    
    // Handle server errors
    if (!response.ok) {
      throw new Error(`Failed to load ticket (${response.status}). Please try again.`);
    }
    
    // Get HTML content
    const htmlContent = await response.text();
    
    // Validate we got HTML (not an error page)
    if (!htmlContent || htmlContent.trim().length === 0) {
      throw new Error('Received empty response from server.');
    }
    
    // Create blob URL from HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    
    // Open ticket in new window
    const ticketWindow = window.open(blobUrl, '_blank');
    
    if (!ticketWindow) {
      // Popup blocked - provide user guidance
      throw new Error(
        'Popup blocked. Please allow popups for this site and try again.'
      );
    }
    
    // Clean up blob URL after window opens (optional - browser will clean up when window closes)
    // We keep it for now in case user refreshes the ticket window
    ticketWindow.addEventListener('beforeunload', () => {
      URL.revokeObjectURL(blobUrl);
    });
    
  } catch (error: any) {
    console.error('Print ticket error:', error);
    const errorMessage = error.message || 'Failed to open ticket. Please try again.';
    options?.onError?.(errorMessage);
  }
};
