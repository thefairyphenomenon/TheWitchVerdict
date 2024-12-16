steps = ["Login", "Swipe Destinations", "Chat with Cities", "Receive Recommendations",
"Match with Partners", "Budget Planning", "Finalize Trip"]
positions = np.arange(len(steps))
axs[0, 0].plot(positions, np.zeros_like(positions), marker='o', markersize=10, linestyle='-', color='blue')
axs[0, 0].set_yticks([])
axs[0, 0].set_xticks(positions)
axs[0, 0].set_xticklabels(steps, rotation=45, ha='right')
axs[0, 0].set_title("User Journey Flowchart")