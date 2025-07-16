/**
 * Permission levels required for different application features.
 * Higher values represent higher permission requirements.
 */

/**
 * Represents the minimum user function level required for various application features
 */
export const RequiredFunctionLevel = {
  /**
   * Permission level needed to manage teams
   */
  TEAM_MANAGEMENT: 3,

  /**
   * Permission level needed for task suggestions
   */
  TASK_SUGGESTIONS: 3,

  /**
   * Permission level needed for final challenge suggestions
   */
  FINAL_CHALLENGE_SUGGESTIONS: 3,

  /**
   * Permission level needed for worksheet management
   */
  WORKSHEET_MANAGEMENT: 2,

  /**
   * Permission level needed for template management
   */
  TEAM_TEMPLATE_MANAGEMENT: 3,

  /**
   * Permission level needed for individual task management
   */
  INDIVIDUAL_TASKS_MANAGEMENT: 3,

  /**
   * Permission level needed for accessing and modifying worksheet notes
   */
  WORKSHEET_NOTES_ACCESS: 4,

  /**
   * Permission level needed for creating worksheets for users outside the team
   */
  OUTSIDE_TEAM_WORKSHEET_CREATION: 3,
};
