// app/dashboard/settings/page.tsx - Mobile Responsive Settings page
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CogIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GlobeAltIcon,
  EyeIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

const settingsSections = [
  {
    id: "profile",
    title: "Profile Settings",
    icon: UserIcon,
    description: "Manage your account information and preferences",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: BellIcon,
    description: "Configure alerts and notification preferences",
  },
  {
    id: "security",
    title: "Security",
    icon: ShieldCheckIcon,
    description: "Manage your account security and privacy settings",
  },
  {
    id: "billing",
    title: "Billing & Subscription",
    icon: CreditCardIcon,
    description: "View and manage your subscription and billing details",
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: GlobeAltIcon,
    description: "Connect with external services and APIs",
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: EyeIcon,
    description: "Customize the look and feel of your dashboard",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileContent, setShowMobileContent] = useState(false);
  const [notifications, setNotifications] = useState({
    fraudAlerts: true,
    budgetWarnings: true,
    salesReports: false,
    systemUpdates: true,
    emailDigest: true,
  });

  const handleSectionSelect = (sectionId: string) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
    setShowMobileContent(true);
  };

  const handleBackToMenu = () => {
    setShowMobileContent(false);
    setSidebarOpen(false);
  };

  const currentSection = settingsSections.find(section => section.id === activeSection);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-palantir-dark-gray-1 border-b border-palantir-dark-gray-4 px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Mobile back button */}
            {showMobileContent && (
              <button
                onClick={handleBackToMenu}
                className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-palantir-gray-3" />
              </button>
            )}
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-palantir-gray-3/20 rounded-xl flex items-center justify-center">
              <CogIcon className="w-6 h-6 sm:w-7 sm:h-7 text-palantir-gray-3" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {showMobileContent && currentSection ? currentSection.title : 'Settings'}
              </h1>
              <p className="text-sm sm:text-base text-palantir-gray-3">
                {showMobileContent && currentSection 
                  ? currentSection.description 
                  : 'Manage your account and application preferences'
                }
              </p>
            </div>
          </div>

          {/* Mobile menu button */}
          {!showMobileContent && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors"
            >
              {sidebarOpen ? (
                <XMarkIcon className="w-6 h-6 text-palantir-gray-3" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-palantir-gray-3" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)] sm:h-[calc(100vh-96px)]">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 bg-palantir-dark-gray-1 border-r border-palantir-dark-gray-4 p-6 overflow-y-auto">
          <nav className="space-y-2">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-white text-black"
                      : "text-palantir-gray-4 hover:text-white hover:bg-palantir-dark-gray-3"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-xs opacity-75 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              />
              <motion.div
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-palantir-dark-gray-1 border-r border-palantir-dark-gray-4 p-6 z-50 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white">Settings Menu</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-palantir-dark-gray-3 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-palantir-gray-3" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {settingsSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSectionSelect(section.id)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? "bg-white text-black"
                            : "text-palantir-gray-4 hover:text-white hover:bg-palantir-dark-gray-3"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium">{section.title}</h3>
                            <p className="text-xs opacity-75 mt-1">
                              {section.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Menu Grid */}
        {!showMobileContent && (
          <div className="lg:hidden flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSectionSelect(section.id)}
                    className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-12 h-12 bg-palantir-dark-gray-1 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-palantir-gray-3" />
                      </div>
                      <h3 className="font-bold text-lg text-black">{section.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 overflow-y-auto ${!showMobileContent ? 'hidden lg:block' : ''}`}>
          <div className="p-4 sm:p-6">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === "profile" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Profile Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4 text-sm sm:text-base"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="john.doe@company.com"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4 text-sm sm:text-base"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          defaultValue="Acme Corporation"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-6 flex justify-end">
                      <button className="btn-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Profile Picture
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-palantir-gray-3 rounded-full flex items-center justify-center">
                        <UserIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </div>
                      <div className="text-center sm:text-left">
                        <button className="bg-black px-4 py-2 rounded-lg mr-0 sm:mr-3 mb-2 sm:mb-0 text-sm sm:text-base">
                          Upload New Photo
                        </button>
                        <button className="block sm:inline text-red-4 hover:text-red-5 transition-colors text-sm sm:text-base">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Notification Preferences
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-start sm:items-center justify-between p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg"
                        >
                          <div className="flex-1 pr-4">
                            <h4 className="font-medium text-white capitalize text-sm sm:text-base">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </h4>
                            <p className="text-xs sm:text-sm text-palantir-gray-4 mt-1">
                              {key === "fraudAlerts" &&
                                "Get notified when suspicious activity is detected"}
                              {key === "budgetWarnings" &&
                                "Receive alerts when budget thresholds are exceeded"}
                              {key === "salesReports" &&
                                "Weekly sales performance and forecast updates"}
                              {key === "systemUpdates" &&
                                "Important system updates and maintenance notices"}
                              {key === "emailDigest" &&
                                "Daily digest of key metrics and insights"}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) =>
                                setNotifications({
                                  ...notifications,
                                  [key]: e.target.checked,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-palantir-dark-gray-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-4"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Delivery Methods
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg border-2 border-blue-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <BellIcon className="w-5 h-5 text-blue-4" />
                          <h4 className="font-medium text-white text-sm sm:text-base">In-App</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-palantir-gray-4">
                          Receive notifications within the application
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg border border-palantir-dark-gray-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <DevicePhoneMobileIcon className="w-5 h-5 text-palantir-gray-4" />
                          <h4 className="font-medium text-white text-sm sm:text-base">SMS</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-palantir-gray-4">
                          Text messages for critical alerts
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg border border-palantir-dark-gray-4 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <ComputerDesktopIcon className="w-5 h-5 text-palantir-gray-4" />
                          <h4 className="font-medium text-white text-sm sm:text-base">Email</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-palantir-gray-4">
                          Email notifications and reports
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "security" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Password & Authentication
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4 text-sm sm:text-base"
                        />
                      </div>
                      <button className="btn-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Two-Factor Authentication
                    </h3>
                    <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-4/20 rounded-lg flex items-center justify-center">
                            <ShieldCheckIcon className="w-5 h-5 text-green-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-sm sm:text-base">
                              2FA Enabled
                            </h4>
                            <p className="text-xs sm:text-sm text-palantir-gray-4">
                              Your account is protected with two-factor authentication
                            </p>
                          </div>
                        </div>
                        <button className="btn-secondary px-4 py-2 rounded-lg text-sm">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      API Keys
                    </h3>
                    <div className="space-y-4">
                      <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div className="mb-3 sm:mb-0">
                              <h4 className="font-medium text-white text-sm sm:text-base">
                                Production API Key
                              </h4>
                              <p className="text-xs sm:text-sm text-palantir-gray-4 break-all">
                                pk_live_*********************abc123
                              </p>
                              <p className="text-xs text-palantir-gray-4 mt-1">
                                Last used: 2 hours ago
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="btn-secondary px-3 py-2 rounded text-xs sm:text-sm">
                                Regenerate
                              </button>
                              <button className="text-red-4 hover:text-red-5 px-3 py-2 rounded text-xs sm:text-sm transition-colors">
                                Revoke
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="btn-primary px-4 py-2 rounded-lg text-sm sm:text-base">
                        Generate New API Key
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "billing" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-black p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
                      Current Subscription
                    </h3>
                    <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-4/10 to-green-3/10 rounded-lg border border-blue-4/30">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                        <div>
                          <h4 className="text-xl sm:text-2xl font-bold text-white">
                            End-to-End Solution
                          </h4>
                          <p className="text-sm sm:text-base text-palantir-gray-3">
                            All features included
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-2xl sm:text-3xl font-bold text-white">
                            Rp 7.500.000
                          </p>
                          <p className="text-sm sm:text-base text-palantir-gray-3">/month</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-center">
                        <div>
                          <p className="text-xs sm:text-sm text-palantir-gray-4">
                            Next Billing
                          </p>
                          <p className="font-bold text-white text-sm sm:text-base">Feb 15, 2025</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-palantir-gray-4">Usage</p>
                          <p className="font-bold text-white text-sm sm:text-base">87% of limits</p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-palantir-gray-4">Status</p>
                          <p className="font-bold text-green-4 text-sm sm:text-base">Active</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <button className="btn-secondary px-4 py-2 rounded-lg text-sm sm:text-base">
                          Change Plan
                        </button>
                        <button className="text-red-4 hover:text-red-5 px-4 py-2 rounded-lg transition-colors text-sm sm:text-base">
                          Cancel Subscription
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Payment Method
                    </h3>
                    <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-blue-4 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              VISA
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-sm sm:text-base">
                              **** **** **** 4242
                            </h4>
                            <p className="text-xs sm:text-sm text-palantir-gray-4">
                              Expires 12/26
                            </p>
                          </div>
                        </div>
                        <button className="btn-secondary px-4 py-2 rounded-lg text-sm">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Billing History
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          date: "Jan 15, 2025",
                          amount: "Rp 7.500.000",
                          status: "Paid",
                        },
                        {
                          date: "Dec 15, 2024",
                          amount: "Rp 7.500.000",
                          status: "Paid",
                        },
                        {
                          date: "Nov 15, 2024",
                          amount: "Rp 7.500.000",
                          status: "Paid",
                        },
                      ].map((invoice, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg space-y-2 sm:space-y-0"
                        >
                          <div>
                            <h4 className="font-medium text-white text-sm sm:text-base">
                              {invoice.date}
                            </h4>
                            <p className="text-xs sm:text-sm text-palantir-gray-4">
                              Monthly subscription
                            </p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end space-x-4">
                            <span className="font-bold text-white text-sm sm:text-base">
                              {invoice.amount}
                            </span>
                            <span className="text-green-4 text-xs sm:text-sm">
                              {invoice.status}
                            </span>
                            <button className="text-blue-4 hover:text-blue-5 text-xs sm:text-sm transition-colors">
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "integrations" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Connected Services
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {[
                        { name: "Slack", status: "Connected", icon: "💬" },
                        {
                          name: "Microsoft Teams",
                          status: "Not Connected",
                          icon: "👥",
                        },
                        {
                          name: "Google Workspace",
                          status: "Connected",
                          icon: "📧",
                        },
                        { name: "Salesforce", status: "Connected", icon: "☁️" },
                        {
                          name: "QuickBooks",
                          status: "Not Connected",
                          icon: "📊",
                        },
                        { name: "Stripe", status: "Connected", icon: "💳" },
                      ].map((service, index) => (
                        <div
                          key={index}
                          className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl sm:text-2xl">{service.icon}</span>
                              <div>
                                <h4 className="font-medium text-white text-sm sm:text-base">
                                  {service.name}
                                </h4>
                                <p
                                  className={`text-xs sm:text-sm ${
                                    service.status === "Connected"
                                      ? "text-green-4"
                                      : "text-palantir-gray-4"
                                  }`}
                                >
                                  {service.status}
                                </p>
                              </div>
                            </div>
                            <button
                              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${
                                service.status === "Connected"
                                  ? "bg-red-4/20 text-red-4 hover:bg-red-4/30"
                                  : "btn-primary"
                              }`}
                            >
                              {service.status === "Connected"
                                ? "Disconnect"
                                : "Connect"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Webhooks
                    </h3>
                    <div className="space-y-4">
                      <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div className="mb-3 sm:mb-0 flex-1">
                              <h4 className="font-medium text-white text-sm sm:text-base">
                                Fraud Detection Webhook
                              </h4>
                              <p className="text-xs sm:text-sm text-palantir-gray-4 break-all">
                                https://api.yourcompany.com/webhooks/fraud
                              </p>
                              <p className="text-xs text-green-4 mt-1">
                                Active • Last triggered 2 hours ago
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="btn-secondary px-3 py-2 rounded text-xs sm:text-sm">
                                Edit
                              </button>
                              <button className="text-red-4 hover:text-red-5 px-3 py-2 rounded text-xs sm:text-sm transition-colors">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="btn-primary px-4 py-2 rounded-lg text-sm sm:text-base">
                        Add New Webhook
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "appearance" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Theme Preferences
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg border-2 border-blue-4">
                        <div className="w-full h-16 sm:h-20 bg-gradient-to-br from-yellow-500 to-black rounded mb-3"></div>
                        <h4 className="font-medium text-white text-sm sm:text-base">Dark (Current)</h4>
                        <p className="text-xs sm:text-sm text-palantir-gray-4">
                          Composite-bumblebee theme
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg border border-palantir-dark-gray-4 opacity-50">
                        <div className="w-full h-16 sm:h-20 bg-gradient-to-br from-gray-100 to-white rounded mb-3"></div>
                        <h4 className="font-medium text-white text-sm sm:text-base">Light</h4>
                        <p className="text-xs sm:text-sm text-palantir-gray-4">
                          Coming soon
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg border border-palantir-dark-gray-4 opacity-50 sm:col-span-2 lg:col-span-1">
                        <div className="w-full h-16 sm:h-20 bg-gradient-to-br from-purple-900 to-blue-900 rounded mb-3"></div>
                        <h4 className="font-medium text-white text-sm sm:text-base">Auto</h4>
                        <p className="text-xs sm:text-sm text-palantir-gray-4">
                          System preference
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Dashboard Layout
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg space-y-2 sm:space-y-0">
                        <div className="flex-1 pr-4">
                          <h4 className="font-medium text-white text-sm sm:text-base">
                            Compact Sidebar
                          </h4>
                          <p className="text-xs sm:text-sm text-palantir-gray-4">
                            Show icons only in sidebar
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-palantir-dark-gray-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-4"></div>
                        </label>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-palantir-dark-gray-2 rounded-lg space-y-2 sm:space-y-0">
                        <div className="flex-1 pr-4">
                          <h4 className="font-medium text-white text-sm sm:text-base">
                            Auto-hide Navigation
                          </h4>
                          <p className="text-xs sm:text-sm text-palantir-gray-4">
                            Hide sidebar when not in use
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-palantir-dark-gray-4 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-4"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-card p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                      Data Visualization
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                          Default Chart Type
                        </label>
                        <select className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4 text-sm sm:text-base">
                          <option>Line Chart</option>
                          <option>Bar Chart</option>
                          <option>Area Chart</option>
                          <option>Mixed Chart</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-palantir-gray-4 mb-2">
                          Animation Speed
                        </label>
                        <select className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-palantir-dark-gray-3 border border-palantir-dark-gray-4 rounded-lg text-white focus:border-blue-4 focus:ring-1 focus:ring-blue-4 text-sm sm:text-base">
                          <option>Fast</option>
                          <option>Normal</option>
                          <option>Slow</option>
                          <option>Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}