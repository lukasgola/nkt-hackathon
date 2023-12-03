import matplotlib.pyplot as plt
import numpy as np

def resistivity_one():

    resistivity = np.array([0.5,0.7,1,1.5,2,2.5,3])
    res_rate  = np.array([1.08,1.02,1.00,0.93,0.89,0.85,0.81])

    plt.scatter(resistivity,res_rate, color='red')
    z = np.polyfit(resistivity,res_rate,2)
    p = np.poly1d(z)

    plt.plot(resistivity,p(resistivity), '--g')
    # Add a title
    plt.title('Wspolczynniki korygujace dla rezystywnosci cieplnych gruntu (YKY/YKXS/YAKXS D1)')
    # Add X and y Label
    plt.xlabel('rezystywnosc cieplna gruntu [K*m/W]')
    plt.ylabel('wspolczynnik korygujacy')
 
    plt.grid(alpha =.6, linestyle ='--')

    plt.text(2,0.95,str(f"       {p}"))
    plt.show()


def resistivity_two():

    resistivity = np.array([0.5,0.7,1,1.5,2,2.5,3])
    res_rate  = np.array([1.25,1.08,1.00,0.85,0.75,0.67,0.60])

    plt.scatter(resistivity,res_rate, color='red')
    z = np.polyfit(resistivity,res_rate,2)
    p = np.poly1d(z)

    plt.plot(resistivity,p(resistivity), '--g')
    # Add a title
    plt.title('Wspolczynniki korygujace dla rezystywnosci cieplnych gruntu (YKY/YKXS/YAKXS D2)')
    # Add X and y Label
    plt.xlabel('rezystywnosc cieplna gruntu [K*m/W]')
    plt.ylabel('wspolczynnik korygujacy')
 
    plt.grid(alpha =.6, linestyle ='--')

    plt.text(2,0.95,str(f"       {p}"))
    plt.show()
