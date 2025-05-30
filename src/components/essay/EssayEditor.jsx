import React, { useState, useEffect } from 'react';
import Button from '../common/Button';

function EssayEditor({ essay, onSave, onRequestFeedback }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [wordLimit, setWordLimit] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Initialize the state with the essay data
  useEffect(() => {
    if (essay) {
      setTitle(essay.title || '');
      setContent(essay.content || '');
      setPrompt(essay.prompt || '');
      setWordLimit(essay.wordLimit || 0);
      setLastSaved(essay.lastUpdated ? new Date(essay.lastUpdated) : null);
    }
  }, [essay]);

  // Update word count when content changes
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    setWordCount(words);
  }, [content]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      // Show an error message or validation
      return;
    }

    setIsSaving(true);

    try {
      // Update the essay object
      const updatedEssay = {
        ...essay,
        title,
        content,
        prompt,
        wordLimit,
        wordCount,
        lastUpdated: new Date().toISOString()
      };

      // Call the save handler from parent
      if (onSave) {
        await onSave(updatedEssay);
      }

      // Update last saved time
      setLastSaved(new Date());
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving essay:', error);
      // Handle error (show message to user)
    } finally {
      setIsSaving(false);
    }
  };

  const handleRequestFeedback = () => {
    if (onRequestFeedback && essay?.id) {
      onRequestFeedback(essay.id);
    }
  };

  // Format the last saved time
  const formatLastSaved = () => {
    if (!lastSaved) return 'Not saved yet';

    const now = new Date();
    const diffMs = now - lastSaved;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Editor Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {isEditing ? 'Editing Essay' : essay?.title || 'New Essay'}
            </h2>
            {!isEditing && (
              <p className="mt-1 text-sm text-gray-500">
                Last saved: {formatLastSaved()}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <>
                <Button onClick={() => setIsEditing(true)}>
                  Edit Essay
                </Button>
                <Button onClick={handleRequestFeedback}>
                  Get AI Feedback
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(false)} className="bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
                  Cancel
                </Button>
                <Button onClick={handleSave} isLoading={isSaving}>
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="essay-title" className="block text-sm font-medium text-gray-700">
                Essay Title
              </label>
              <input
                type="text"
                id="essay-title"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Essay Title"
              />
            </div>

            <div>
              <label htmlFor="essay-prompt" className="block text-sm font-medium text-gray-700">
                Essay Prompt
              </label>
              <textarea
                id="essay-prompt"
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Paste the essay prompt here..."
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="essay-content" className="block text-sm font-medium text-gray-700">
                  Essay Content
                </label>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">
                    Word Count: {wordCount}
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <div>
                    <label htmlFor="word-limit" className="text-sm text-gray-500 mr-2">
                      Word Limit:
                    </label>
                    <input
                      type="number"
                      id="word-limit"
                      className="w-20 text-sm border border-gray-300 rounded p-1 focus:ring-blue-500 focus:border-blue-500"
                      value={wordLimit}
                      onChange={(e) => setWordLimit(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
              <textarea
                id="essay-content"
                rows={12}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your essay here..."
              />
              {wordLimit > 0 && wordCount > wordLimit && (
                <p className="mt-1 text-sm text-red-600">
                  Your essay exceeds the word limit by {wordCount - wordLimit} words.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {prompt && (
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Prompt:</h3>
                <p className="mt-1 text-sm text-gray-600">{prompt}</p>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">Your Essay:</h3>
                <div className="text-sm text-gray-500">
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                  {wordLimit > 0 && ` / ${wordLimit} word limit`}
                </div>
              </div>
              <div className="p-4 rounded border border-gray-200 prose max-w-none">
                {content ? (
                  <div>
                    {content.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No content yet. Click "Edit Essay" to start writing.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EssayEditor;